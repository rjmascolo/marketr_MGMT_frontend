import React from 'react'
import {connect} from 'react-redux'
import UserList from '../containers/UserList'

import { Tab } from 'semantic-ui-react'

class ProjectHeaderUserInfo extends React.Component {

  render() {

    const companyTabs = this.props.companies.map(company => {
      return { menuItem: company.name, render: () => <Tab.Pane attached={false}> <UserList users={company.users} /> </Tab.Pane> }
    })
    return (
      <div id="users-outer-container">
        <h4>Project Users</h4>
        <Tab menu={{ secondary: true, pointing: true }} panes={companyTabs} />
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  let data =  state.projects.length > 0 ? state.projects.find(project => project.id === parseInt(props.projectId)) : []
  let companies =  state.projects.length > 0 ? data.campaign.agencies : []
  let users = state.projects.length > 0 ? data.get_users : []
  companies.forEach( company => {
    company.users = []
    users.forEach( user =>  {
      if ( user.company_id === company.id ) {
        company.users.push(user);
      }
    })
  })
  return {
    companies: state.projects.length > 0 ? companies : [],
  }
}

export default connect(mapStateToProps)(ProjectHeaderUserInfo)
