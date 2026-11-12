import { mentors } from "../src/data/mentors.js"

const MODEL = "openai/gpt-oss-20b"
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
const MAX_MATCHES = 3

function buildPrompt(goal) {
  const mentorList = mentors
    .map(
      (mentor) =>
        `ID ${mentor.id}: ${mentor.name}, ${mentor.role} (${mentor.university}). ` +
        `Expertise: ${mentor.expertise.join(", ")}. Bio: ${mentor.bio}`
    )
    .join("\n")

  return [
    {
      role: "system",
      content:
        "You match students with mentors. Choose up to 3 mentors from the list who best fit " +
        "the student's goal. Only use mentor IDs from the list. Reply with JSON only, in this " +
        'exact shape: {"matches": [{"id": 1, "reason": "one short sentence"}]}. ' +
        "Order matches from best to worst. Each reason must be under 25 words and explain the fit.",
    },
    {
      role: "user",
      content: `Mentors:\n${mentorList}\n\nStudent's goal: ${goal}`,
    },
  ]
}

function cleanMatches(rawMatches) {
  if (!Array.isArray(rawMatches)) {
    return []
  }

  const validIds = new Set(mentors.map((mentor) => mentor.id))
  const seen = new Set()
  const matches = []

  for (const item of rawMatches) {
    const id = Number(item?.id)
    const reason = typeof item?.reason === "string" ? item.reason.trim() : ""

    if (!validIds.has(id) || seen.has(id) || !reason) {
      continue
    }

    seen.add(id)
    matches.push({ id, reason: reason.slice(0, 200) })
  }

  return matches.slice(0, MAX_MATCHES)
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." })
  }

  const goal = typeof req.body?.goal === "string" ? req.body.goal.trim() : ""

  if (goal.length < 10 || goal.length > 500) {
    return res
      .status(400)
      .json({ error: "Please describe your goal in 10 to 500 characters." })
  }

  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    return res.status(503).json({ error: "AI matching is not configured." })
  }

  try {
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: buildPrompt(goal),
        response_format: { type: "json_object" },
        temperature: 0,
        reasoning_effort: "low",
        max_completion_tokens: 1000,
      }),
    })

    if (!response.ok) {
      throw new Error(`Groq returned status ${response.status}`)
    }

    const data = await response.json()
    const parsed = JSON.parse(data.choices[0].message.content)
    const matches = cleanMatches(parsed.matches)

    if (matches.length === 0) {
      return res
        .status(503)
        .json({ error: "We couldn't find a good match right now. Please try again." })
    }

    return res.status(200).json({ matches })
  } catch (error) {
    console.error("Mentor match failed:", error)
    return res
      .status(503)
      .json({ error: "AI matching is unavailable right now. Please try again later." })
  }
}