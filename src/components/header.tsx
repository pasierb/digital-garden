import React, { FC, useRef } from "react"
import { Link } from "gatsby"
import { SearchConsumer } from "./search"

interface HeaderProps {
  siteTitle: string
}

const Header: FC<HeaderProps> = ({ siteTitle }) => {
  const searchFormRef = useRef<HTMLFormElement>(null)

  return (
    <SearchConsumer>
      {({ open, search, isOpen }) => {
        if (!isOpen) {
          searchFormRef.current?.reset()
        }

        return (
          <header>
            <Link to="/" className="brand">
              {siteTitle}
            </Link>

            <nav>
              <form className="pure-form" ref={searchFormRef}>
                <input
                  onChange={e => search(e.target.value)}
                  className="pure-input"
                  placeholder="🔎 Search"
                />
                {/* <button className="pure-button button-small button-secondary" onClick={() => open()}>🔍 Search</button> */}
              </form>
            </nav>
          </header>
        )
      }}
    </SearchConsumer>
  )
}

export default Header
