import axios from "axios"
import User from "../models/User.js"

/**
 * STEP 1: Redirect to GitHub
 */
export const githubAuthRedirect = (req, res) => {
  const redirectUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&scope=read:user repo` +
    `&state=${req.user._id}`

  res.redirect(redirectUrl)
}

/**
 * STEP 2: OAuth Callback
 */
export const githubOAuthCallback = async (req, res) => {
  const { code, state } = req.query

  // state = AZ_PM userId
  const userId = state

  // Exchange code for access token
  const tokenRes = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    },
    {
      headers: { Accept: "application/json" }
    }
  )

  const accessToken = tokenRes.data.access_token

  // Fetch GitHub profile
  const profileRes = await axios.get(
    "https://api.github.com/user",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  const githubUser = profileRes.data

  // Prevent linking same GitHub account twice
  const existing = await User.findOne({
    "github.githubUserId": githubUser.id
  })

  if (existing && existing._id.toString() !== userId) {
    return res.status(409).json({
      message: "This GitHub account is already linked"
    })
  }

  // Link GitHub to AZ_PM user
  await User.findByIdAndUpdate(userId, {
    github: {
      githubUserId: githubUser.id,
      username: githubUser.login,
      avatarUrl: githubUser.avatar_url,
      profileUrl: githubUser.html_url,
      linkedAt: new Date()
    }
  })

  // Redirect back to frontend
  res.redirect("http://localhost:5174/dashboard?github=connected")
}
