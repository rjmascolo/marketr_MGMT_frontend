import React from 'react'
import '../css/login.css'
import { login, fetchUser } from '../reducers/actions/actions'

import { connect } from 'react-redux'

class LogIn extends React.Component {
  state = {
    error: false,
    fields: {
      email: '',
      password: ''
    }
  }

  handleChange = (e) => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value}
    this.setState({fields: newFields})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    login(this.state.fields.email, this.state.fields.password)
    .then(user => {
      if(user.error){
        this.setState({error:true})
      } else {
        this.props.fetchUser(user.id)
        localStorage.setItem('token', user.token)
        this.props.history.push('/dashboard')
      }
    })
    this.setState({fields: {email: '', password: ''}})
  }

  logInWithSeedData = () => {
    login("ryan@email.com", "123")
    .then(user => {
      if(user.error){
        this.setState({error:true})
      } else {
        this.props.fetchUser(user.id)
        localStorage.setItem('token', user.token)
        this.props.history.push('/dashboard')
      }
    })
    this.setState({fields: {email: '', password: ''}})
  }

  render() {
    return (
      <div id="fill-page" style={{ minHeight: window.innerHeight}}>
      <div id="login-form">
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui image header" id="login-header">
            <div className="content">
              Log-in to your account
            </div>
          </h2>
          <form className="ui large form" onSubmit={this.handleSubmit}>
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input type="text" name="email" placeholder="E-mail address" value={this.state.fields.email} onChange={this.handleChange}/>
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input type="password" name="password" placeholder="Password" value={this.state.fields.password} onChange={this.handleChange} />
                </div>
              </div>
              <input type="submit" id="login-button" className="ui fluid large submit button" value="Login" />
            </div>

            <div className="ui error message">
              {this.state.error ? <div className="header">Not Found</div> : null}
            </div>

          </form>

          <div className="ui message">
            New to us? <a href="/sign-up">Sign Up</a>
          </div>
          <div className="ui message">
            <div id="login-button" className="ui fluid large submit button" onClick={this.logInWithSeedData}>Log In With Seed Data</div>
          </div>
        </div>
      </div>
      </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {fetchUser: (id) => dispatch(fetchUser(id))}
}

export default connect(null, mapDispatchToProps)(LogIn);
