require("dotenv").config();
const axios = require("axios");
const supabase = require("../../config/supabase");

const API_URL = process.env.API_URL;

async function fetchFromAPI() {
    const { data } = await axios.get(API_URL);
    return data.map((country) => ({
        name:         country.name,
        alpha2Code:   country.alpha2Code,
        alpha3Code:   country.alpha3Code,
        callingCodes: country.callingCodes ?? [],
        capital:      country.capital ?? null,
        subregion:    country.subregion ?? null,
        region:       country.region ?? null,
        population:   country.population ?? 0,
        demonym:      country.demonym ?? null,
        borders:      country.borders ?? [],
        flag:         country.flag ?? country.flags?.svg ?? null,
        currencies: (country.currencies ?? []).map((c) => ({
            code:   c.code,
            name:   c.name,
            symbol: c.symbol,
        })),
        languages: (country.languages ?? []).map((l) => ({
            iso639_1:   l.iso639_1,
            iso639_2:   l.iso639_2,
            name:       l.name,
            nativeName: l.nativeName,
        })),
    }));
}

async function seedCountries() {
    console.log("Obteniendo datos de la API...");
    const countries = await fetchFromAPI();
    console.log(`Total países obtenidos: ${countries.length}`);

    let inserted = 0;
    let skipped = 0;
    let errors = 0;

    for (const country of countries) {
        try {
            const { data: existing } = await supabase
                .from("countries")
                .select("id")
                .eq("alpha2code", country.alpha2Code)
                .single();

            if (existing) {
                skipped++;
                continue;
            }

            const { data: inserted_country, error: countryError } = await supabase
                .from("countries")
                .insert({
                    name:       country.name,
                    alpha2code: country.alpha2Code,
                    alpha3code: country.alpha3Code,
                    capital:    country.capital,
                    subregion:  country.subregion,
                    region:     country.region,
                    population: country.population,
                    demonym:    country.demonym,
                    flag:       country.flag,
                })
                .select("id")
                .single();

            if (countryError) throw countryError;

            const countryId = inserted_country.id;

            if (country.callingCodes.length > 0) {
                const { error } = await supabase
                    .from("calling_codes")
                    .insert(country.callingCodes.map((code) => ({
                        country_id: countryId,
                        code,
                    })));
                if (error) throw error;
            }

            if (country.borders.length > 0) {
                const { error } = await supabase
                    .from("borders")
                    .insert(country.borders.map((border_code) => ({
                        country_id: countryId,
                        border_code,
                    })));
                if (error) throw error;
            }

            if (country.currencies.length > 0) {
                const { error } = await supabase
                    .from("currencies")
                    .insert(country.currencies.map((c) => ({
                        country_id: countryId,
                        code:       c.code,
                        name:       c.name,
                        symbol:     c.symbol,
                    })));
                if (error) throw error;
            }

            if (country.languages.length > 0) {
                const { error } = await supabase
                    .from("languages")
                    .insert(country.languages.map((l) => ({
                        country_id: countryId,
                        iso639_1:   l.iso639_1,
                        iso639_2:   l.iso639_2,
                        name:       l.name,
                        nativename: l.nativeName,
                    })));
                if (error) throw error;
            }

            inserted++;
            console.log(`✓ ${country.name}`);

        } catch (err) {
            errors++;
            console.error(`✗ Error en ${country.name}:`, err.message);
        }
    }

    return { total: countries.length, inserted, skipped, errors };
}

module.exports = { seedCountries };