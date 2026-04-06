// src/controllers/github.vscode.controller.js
import jwt from "jsonwebtoken";

export const githubVSCodeRedirect = async (req, res) => {
  const vscodeRedirect = req.query.redirect; // deep-link from VS Code

  const state = jwt.sign(
    { vscode: true, redirect: vscodeRedirect },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );

  const url =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&scope=read:user repo` +
    `&state=${state}`;

  res.redirect(url);
};
