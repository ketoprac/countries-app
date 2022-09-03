import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { BsArrowLeft } from "react-icons/bs";
import { countries } from './index';

let URL = "https://restcountries.com/v3.1/all/";
let URL2 = "https://restcountries.com/v3.1/name/";
let URL3 = "https://restcountries.com/v3.1/alpha/";

export default function CountryDetail({ country, countries  }) {
  const nativeName = country.name;
  const {
    name,
    tld,
    currencies,
    region,
    subregion,
    languages,
    borders,
    population,
    flags,
    capital,
  } = country;

  // Get Borders
  const borderAcronyms = country.borders ? [...country.borders] : 'no borders'
  const firstThreeAcr = borderAcronyms.slice(0, 3)

  function getCountryByAcronym(acronym) {
    let acronymList = []
    countries.filter((country) => {
      country.cca3 === acronym ? acronymList.push(country.name.common) : ''
    })
    return acronymList
  }

  let countryList = []
  for (let acr in firstThreeAcr) {
    let countries
    countries = getCountryByAcronym(firstThreeAcr[acr])
    countryList.push(countries)
  }

  console.log(countryList);

  return (
    <div>
      <Head>
        <title>{name.common} | Countries Finder App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Link href="/">
        <a>
          <button
            className="back-button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              maxHeight: "32px",
            }}
          >
            <BsArrowLeft fontWeight="bold" />
            <p>Back</p>
          </button>
        </a>
      </Link>
      <main className="country-detail_wrapper">
        <section className="country-detail_flag">
          <img src={flags.svg} alt="Country Flag" />
        </section>
        <section className="country-detail_desc">
          <h2>{name.common}</h2>
          <section className="country-detail_desc_wrapper">
            <div>
              <p>
                <span>Native Name:</span> {Object.values(nativeName)[0]}
              </p>
              <p>
                <span>Population:</span> {population.toLocaleString("en-us")}
              </p>
              <p>
                <span>Region:</span> {region}
              </p>
              <p>
                <span>Sub Region:</span> {subregion}
              </p>
              <p>
                <span>Capital:</span> {capital}
              </p>
            </div>
            <div>
              <p>
                <span>Top Level Domain:</span> {tld}
              </p>
              <p>
                <span>Currencies:</span> {Object.keys(currencies)[0]}
              </p>
              <p>
                <span>Languages:</span> {Object.values(languages)[0]}
              </p>
            </div>
          </section>
          <div>
            <span>Border Countries: </span>
            {borders
              ? countryList.map((border) => (
                  <Link key={border} href={`/` + border.toString().toLowerCase()}>
                    <a>
                      <button className="border-button">{border}</button>
                    </a>
                  </Link>
                ))
              : "No Borders"}
          </div>
        </section>
      </main>
    </div>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch(URL);
  const data = await res.json();

  const paths = data.map((country) => {
    return {
      params: { id: country.name.common.toString().toLowerCase() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(URL2 + id);
  const res2 = await fetch(URL);
  const data = await res.json();
  const data2 = await res2.json();
  const finalData = data[0];

  return {
    props: { country: finalData, countries: data2 },
  };
};

// export const getStaticProps = async (context) => {
//   const id = context.params.id;
//   const [countryRes, borderRes] = await Promise.all([
//     fetch(URL2 + id),
//     fetch(URL3)
//   ]);
//   const [country, border] = await Promise.all([
//     countryRes.json(),
//     borderRes.json()
//   ])
//   // const data = await res.json();
//   const finalData = country[0];

//   return {
//     props: { country: finalData, border },
//   };
// };
