import RawEvent from "../models/RawEvent.js"
import { normalizeGithubEvent } from "../services/githubNormalizer.service.js"

export const runGithubNormalizer = async () => {
  const events = await RawEvent.find({
    source: "github",
    processed: false
  }).limit(10)

  for (const event of events) {
    try {
      await normalizeGithubEvent(event)
    } catch (err) {
      console.error(
        "❌ GitHub normalization failed:",
        err.message
      )
    }
  }
}
