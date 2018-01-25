import React from 'react'
import { Dropdown, Button, Label } from 'semantic-ui-react'

import { updateUsers } from '../reducers/actions/actions'
import { connect } from 'react-redux'

import { combineUsers } from '../services/helpers.js'


import '../css/RevisionCreateForm.css'


class EditUsersForm extends React.Component {
  state = {
    projectUsers: this.props.currentUsers.map(user => user.id),
    errors: false
  }

  submitUsers= (e) => {
    e.preventDefault()
    const state = this.state
    if (state.projectUsers.length > 0) {
      this.props.updateUsers( {userIds: this.state.projectUsers, project_id: parseInt(this.props.projectId), updateType: "edit users" } )
      this.props.close()
    } else {
      this.setState({errors: true})
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleUserDropDownChange = (data, e) => {
    this.setState({ projectUsers:  e.value })
  }

  render() {
    return(
      <div>
        <div id="add-users-project">
          <Dropdown placeholder='Add Users' multiple search selection
            id="add-users-project"
            onChange={this.handleUserDropDownChange}
            value={this.state.projectUsers}
            options={this.props.users.map(user => {
              return {key: user.id , value: user.id, text:`${user.first_name} ${user.last_name}`}
            })}
          />
          {this.state.errors ? <Label basic color='red' >You need to add users</Label> : null}
        </div>
        <Button id="edit-project-button" onClick={this.submitUsers} color="teal">Submit</Button>
      </div>
    )
  }
}

function mapStateToProps(state, props) {

  let x = state.projects ? (state.projects.find(project => project.id === parseInt(props.projectId)).get_users) : null

  return {
    currentUsers: x ,
    users: state.company ? combineUsers(state.company.user_details, x) : null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUsers: (projectUsers) => dispatch(updateUsers(projectUsers))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUsersForm);
