import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {error: false, username: '', password: '', errorMsg: ''}

  addUser = event => {
    this.setState({username: event.target.value})
  }

  addPass = event => {
    this.setState({password: event.target.value})
  }

  success = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })

    history.replace('/')
  }

  onFailure = value => {
    this.setState({error: true, errorMsg: value})
  }

  addUserData = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const data = {username, password}
    const option = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    const response = await fetch('https://apis.ccbp.in/login', option)
    const data1 = await response.json()
    console.log(response)
    console.log(data1)
    if (response.ok === true) {
      this.success(data1.jwt_token)
    } else {
      this.onFailure(data1.error_msg)
    }
  }

  render() {
    const {error, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-con">
        <div className="crd">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="img-lg"
          />
          <form onSubmit={this.addUserData} className="fm">
            <label htmlFor="name" className="lb">
              USERNAME
            </label>
            <input
              id="name"
              className="inp"
              type="text"
              placeholder="Username"
              onChange={this.addUser}
            />
            <label htmlFor="pass" className="lb">
              PASSWORD
            </label>
            <input
              id="name"
              className="inp"
              type="password"
              placeholder="Password"
              onChange={this.addPass}
            />
            <button type="submit" className="sb-btn">
              Login
            </button>
            {error === true && <p className="error">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
