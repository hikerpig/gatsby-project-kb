import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle, addons }) => (
  <header>
    <div>
      <h1 style={{ margin: 0 }}>
        <Link to="/">{siteTitle}</Link>
      </h1>
    </div>
    {addons ? <div className="header__addons">{addons}</div>: null}
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
