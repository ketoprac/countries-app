export default function FilterCountries({onChange}) {
  return (
    <form>
      <select onChange={onChange} name="region" id="region">
        <option value="default">Filter by region</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </form>
  )
}