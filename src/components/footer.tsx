import React from "react"
import GithubIcon from "../icons/github.svg"

const Footer = () => {
  return (
    <footer>
      <p>Michal Pasierbski © {new Date().getFullYear()}</p>

      <p>
        You can find source code for this page at{" "}
        <a href="https://github.com/pasierb/digital-garden">
          <GithubIcon title="github" />
        </a>
        .
      </p>

      <strong>Links:</strong>

      <ul>
        <li>
          <a href="https://github.com/pasierb">GitHub</a>
        </li>
        <li>
          <a href="https://twitter.com/mpasierbski">Twitter</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/mpasierbski/">LinkedIn</a>
        </li>
        <li>
          <a href="https://mpasierbski.com/cv">CV</a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
