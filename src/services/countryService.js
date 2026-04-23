require("dotenv").config();

const axios = require("axios");
const API_URL = process.env.API_URL;

async function fetchCountries() {
    const { data } = await axios.get(API_URL);
    return data;
}

async function fetchData() {
    const data = await axios.get(API_URL);
    async function fetchCountries() {
        const { data } = await axios.get(API_URL);

        return data.map((country) => ({
            name: country.name,
            alpha2Code: country.alpha2Code,
            alpha3Code: country.alpha3Code,
            callingCodes: country.callingCodes ?? [],
            capital: country.capital ?? null,
            subregion: country.subregion ?? null,
            region: country.region ?? null,
            population: country.population ?? 0,
            demonym: country.demonym ?? null,
            borders: country.borders ?? [],
            flag: country.flag ?? country.flags?.svg ?? null,
            currencies: (country.currencies ?? []).map((c) => ({
                code: c.code,
                name: c.name,
                symbol: c.symbol,
            })),
            languages: (country.languages ?? []).map((l) => ({
                iso639_1: l.iso639_1,
                iso639_2: l.iso639_2,
                name: l.name,
                nativeName: l.nativeName,
            })),
        }));
    }



}
