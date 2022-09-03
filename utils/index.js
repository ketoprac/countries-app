let URL = "https://restcountries.com/v3.1/alpha/";

const getCountryName = async (name) => {
  const res = await fetch(URL + name);
  const data = await res.json();
  const countryName = JSON.stringify(data[0].name?.common);
  
  return countryName;
}

export { getCountryName }