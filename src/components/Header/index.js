/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onDelete = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nv">
      <Link to="/">
        <button type="button" className="btn-lg">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="lg1"
            alt="website logo"
          />
        </button>
      </Link>
      <ul className="fl">
        <Link to="/" className="ln">
          <li className="pp">Home</li>
        </Link>
        <Link to="/jobs" className="ln">
          <li className="pp">Jobs</li>
        </Link>
      </ul>

      <button className="btn-log" onClick={onDelete}>
        <ul>
          <li>Logout</li>
        </ul>
      </button>
    </nav>
  )
}

export default withRouter(Header)
