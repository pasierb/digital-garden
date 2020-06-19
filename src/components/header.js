import React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header>
    <Link to="/" className="brand">{siteTitle}</Link>

    <input />
  </header>
)

export default Header
