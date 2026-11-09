import MentorCard from "./components/MentorCard"
import { mentors } from "./data/mentors"

function App() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900">Mentor Portal</h1>
          <p className="mt-2 text-slate-600">
            Find a Grad Careers mentor who fits your goals.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default App