import { inputStyles } from "./inputStyles"

function FilterBar({
  expertiseOptions,
  selectedExpertise,
  onExpertiseChange,
  universityOptions,
  selectedUniversity,
  onUniversityChange,
}) {
  return (
    <>
      <select
        value={selectedExpertise}
        onChange={(event) => onExpertiseChange(event.target.value)}
        aria-label="Filter by expertise"
        className={inputStyles}
      >
        <option value="All">All expertise</option>
        {expertiseOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={selectedUniversity}
        onChange={(event) => onUniversityChange(event.target.value)}
        aria-label="Filter by university"
        className={inputStyles}
      >
        <option value="All">All universities</option>
        {universityOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  )
}

export default FilterBar