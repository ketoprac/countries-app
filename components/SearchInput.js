import { AiOutlineSearch } from 'react-icons/ai';

export default function SearchInput({ onChange, value }) {
  return (
    <form className="search-form">
      <div className="search-icon">
      <AiOutlineSearch />
      </div>
      <input onChange={onChange} value={value} placeholder="Search for a country..." />
    </form>
  )
}