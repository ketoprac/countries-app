export default function SearchInput({ onChange, value }) {
  return (
    <form>
      <input onChange={onChange} value={value} placeholder="Search for a country..." />
    </form>
  )
}