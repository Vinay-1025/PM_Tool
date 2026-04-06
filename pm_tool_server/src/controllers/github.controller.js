import RawEvent from "../models/RawEvent.js"

export const githubWebhook = async (req, res) => {
  console.log("🔥 GITHUB WEBHOOK HIT")
  console.log("Event:", req.headers["x-github-event"])

  await RawEvent.create({
    source: "github",
    eventType: req.headers["x-github-event"],
    payload: req.body,
    processed: false
  })

  res.status(202).json({ message: "GitHub event accepted" })
}

