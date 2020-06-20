import React, { FC } from "react"
import { Link } from "gatsby"
import { SearchConsumer } from './search';

interface HeaderProps {
  siteTitle: string
}

const Header: FC<HeaderProps> = ({ siteTitle }) => (
  <SearchConsumer>
    {({ open }) => (
      <header>
        <Link to="/" className="brand">{siteTitle}</Link>

        <nav>
          <button className="pure-button button-small button-secondary" onClick={() => open()}>🔍 Search</button>
        </nav>
      </header>
    )}
  </SearchConsumer>
)

export default Header
