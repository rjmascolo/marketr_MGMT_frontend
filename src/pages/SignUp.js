import React from 'react'
import '../css/login.css'

import { createUser, fetchUser } from '../reducers/actions/actions'
import { connect } from 'react-redux'

class SignUp extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    position: '',
    email: '',
    image: '',
    password: '',
    retypedPassword: '',
    company_id: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createUser( this.state )
    .then(user => {
      if(user.error){
        // this.setState({error:true})
      } else {
        this.props.fetchUser(user.id)
        localStorage.setItem('token', user.token)
        this.props.history.push('/dashboard')
      }
    })
  }

  render() {
    return (
      <div id="fill-page">
          <div id="login-form">
          <div className="ui middle aligned center aligned grid">
            <div className="column">
              <h2 className="ui image header" id="login-header">
                <div className="content">
                  Sign Up
                </div>
              </h2>
              <form className="ui large form" onSubmit={this.handleSubmit}>
                <div className="ui stacked segment">
                  <div className="field" id="group">
                    <div className="ui left icon input" id="margin-right">
                      <input type="text" name="first_name" placeholder="First Name" value={this.state.first_name} onChange={this.handleChange}/>
                    </div>
                    <div className="ui left icon input">
                      <input type="text" name="last_name" placeholder="Last Name" value={this.state.last_name} onChange={this.handleChange}/>
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="briefcase icon"></i>
                      <input type="text" name="position" placeholder="Position" value={this.state.position} onChange={this.handleChange}/>
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="image icon"></i>
                      <input type="text" name="image" placeholder="Image" value={this.state.image} onChange={this.handleChange}/>
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="user icon"></i>
                      <input type="text" name="email" placeholder="E-mail address" value={this.state.email} onChange={this.handleChange}/>
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="lock icon"></i>
                      <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="lock icon"></i>
                      <input type="password" name="retypedPassword" placeholder="Retype Password" value={this.state.retypedPassword} onChange={this.handleChange} />
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="icon"></i>
                      <input type="text" name="company_id" placeholder="Company Number" value={this.state.company_id} onChange={this.handleChange} />
                    </div>
                  </div>
                  <div className="ui fluid large submit button" onClick={this.handleSubmit}  id="login-button" >Sign Up</div>
                </div>

                <div className="ui error message"></div>

              </form>

            </div>
          </div>
          </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createUser: (data) => dispatch(createUser(data)),
    fetchUser: (id) => dispatch(fetchUser(id))
  }
}


export default connect(null, mapDispatchToProps)(SignUp);
