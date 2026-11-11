import { useState } from "react"
import { inputStyles } from "./inputStyles"

const emptyForm = { name: "", email: "", date: "", message: "" }

function validate(form) {
  const errors = {}

  if (!form.name.trim()) {
    errors.name = "Please enter your name."
  }

  if (!form.email.trim()) {
    errors.email = "Please enter your email."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address."
  }

  if (!form.date) {
    errors.date = "Please choose a preferred date."
  }

  if (form.message.trim().length < 10) {
    errors.message = "Please write at least 10 characters about what you'd like help with."
  }

  return errors
}

function BookingModal({ mentor, onClose }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const today = new Date().toLocaleDateString("en-CA")

  function handleChange(event) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const newErrors = validate(form)
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        {submitted ? (
          <div className="text-center">
            <h2 id="booking-title" className="text-xl font-semibold text-slate-900">
              Request sent!
            </h2>
            <p className="mt-2 text-slate-600">
              Thanks, {form.name}. {mentor.name} will be in touch at {form.email} about
              a session on {form.date}.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              This is a demo booking flow, so no request was actually sent.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 id="booking-title" className="text-xl font-semibold text-slate-900">
              Request a session with {mentor.name}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {mentor.role} · {mentor.university}
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className={`mt-1 ${inputStyles}`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`mt-1 ${inputStyles}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-slate-700">
                  Preferred date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={handleChange}
                  className={`mt-1 ${inputStyles}`}
                />
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                  What would you like help with?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className={`mt-1 ${inputStyles}`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Send request
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default BookingModal