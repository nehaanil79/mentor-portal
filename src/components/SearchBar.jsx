import { inputStyles } from "./inputStyles"

function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search by name, role or skill"
      aria-label="Search mentors"
      className={inputStyles}
    />
  )
}

export default SearchBar