function MentorCard({ mentor, onRequest }) {
  const initials = mentor.name
    .split(" ")
    .map((part) => part[0])
    .join("")

  return (
    <article className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
          {initials}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{mentor.name}</h2>
          <p className="text-sm text-slate-600">{mentor.role}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-500">
        {mentor.university} · {mentor.yearsExperience} years experience
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {mentor.expertise.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
          >
            {skill}
          </span>
        ))}
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">{mentor.bio}</p>

      <button
        type="button"
        onClick={() => onRequest(mentor)}
        className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Request a session
      </button>
    </article>
  )
}

export default MentorCard