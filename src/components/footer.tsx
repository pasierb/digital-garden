import React from "react"
import GithubIcon from "../icons/github.svg"

const Footer = () => {
  return (
    <footer>
      <p>Michal Pasierbski © {new Date().getFullYear()}</p>

      <p>
        You can find source code for this page at{" "}
        <a href="https://github.com/pasierb/digital-garden">
          <GithubIcon />
        </a>
        .
      </p>
    </footer>
  )
}

export default Footer
