import { useState } from "react"
import MentorCard from "./components/MentorCard"
import { mentors } from "./data/mentors"


const expertiseOptions = [...new Set(mentors.flatMap((mentor) => mentor.expertise))].sort()
const universityOptions = [...new Set(mentors.map((mentor) => mentor.university))].sort()

function App() {
  const [searchText, setSearchText] = useState("")
  const [selectedExpertise, setSelectedExpertise] = useState("All") 
  const [selectedUniversity, setSelectedUniversity] = useState("All") 

  const search = searchText.trim().toLowerCase()

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      search === "" ||
      mentor.name.toLowerCase().includes(search) ||
      mentor.role.toLowerCase().includes(search) ||
      mentor.expertise.some((skill) => skill.toLowerCase().includes(search))

 
    const matchesExpertise =
      selectedExpertise === "All" || mentor.expertise.includes(selectedExpertise)

    
    const matchesUniversity =
      selectedUniversity === "All" || mentor.university === selectedUniversity

    return matchesSearch && matchesExpertise && matchesUniversity
  })

  
  function clearFilters() {
    setSearchText("")
    setSelectedExpertise("All")
    setSelectedUniversity("All")
  }

  const inputStyles =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900">Mentor Portal</h1>
          <p className="mt-2 text-slate-600">
            Find a Grad Careers mentor who fits your goals.
          </p>
        </header>

        <div className="mb-4 grid gap-4 sm:grid-cols-3">
          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search by name, role or skill"
            aria-label="Search mentors"
            className={inputStyles}
          />

          
          <select
            value={selectedExpertise}
            onChange={(event) => setSelectedExpertise(event.target.value)}
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
            onChange={(event) => setSelectedUniversity(event.target.value)}
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
        </div>

      
        <p className="mb-6 text-sm text-slate-600">
          Showing {filteredMentors.length} of {mentors.length} mentors
        </p>

        
        {filteredMentors.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-slate-200">
            <p className="text-slate-700">No mentors match your search.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default App