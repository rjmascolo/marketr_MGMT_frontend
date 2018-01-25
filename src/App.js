import React, { Component } from 'react';
import NavBar from './NavBar'
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router'
import { fetchUser, getCurrentUser, getCampaignUsers } from './reducers/actions/actions'
import { connect } from 'react-redux'

import IndividualProject from './pages/individualProject'
import Dashboard from './pages/Dashboard'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import CreateNewProject from './forms/CreateNewProject'


class App extends Component {

  componentDidMount(){

    const token = localStorage.getItem('token');
    if (token){
      getCurrentUser()
      .then( user => {
        if(user.error) {
          localStorage.clear()
          this.forceUpdate()
        } else {
        this.props.fetchUser(user.id).then(campaignId => this.props.getCampaignUsers(campaignId))
        }
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <NavBar />
            <Route path="/" exact render= {() => <Redirect to='/dashboard' /> } />
            <Route path="/dashboard" render={() => {
              const token = localStorage.getItem('token')
              return token ? <Dashboard /> : <Redirect to='/login' />
              }} />
            <Route path="/projects/:id" render={(args) => {
              const token = localStorage.getItem('token')
              return token ? <IndividualProject id={args.match.params.id} /> : <Redirect to='/login'/>
              }} />
              <Route path="/new-project" render={() => {
                const token = localStorage.getItem('token')
                return token ? <CreateNewProject /> : <Redirect to='/login' />
                }} />
            <Route path="/login" render={ routerProps =>  <LogIn history={routerProps.history} />} />
            <Route path="/sign-up" component={SignUp} />

          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {user: state.user}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    getCampaignUsers: (id) => dispatch(getCampaignUsers(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
