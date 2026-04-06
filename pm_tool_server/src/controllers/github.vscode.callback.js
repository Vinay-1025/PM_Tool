// src/controllers/github.vscode.callback.js
import jwt from "jsonwebtoken";

export const githubVSCodeCallback = async (req, res) => {
  try {
    const { state } = req.query;

    const decoded = jwt.verify(state, process.env.JWT_SECRET);

    if (!decoded.vscode) {
      return res.status(400).send("Invalid VS Code OAuth state");
    }

    // Redirect back into VS Code
    res.redirect(decoded.redirect + "?connected=true");
  } catch (err) {
    console.error("VSCode OAuth error:", err.message);
    res.status(401).send("Invalid token");
  }
};
