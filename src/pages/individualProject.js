import React from 'react'
import {connect} from 'react-redux'

import { Image, Icon, List, Segment, Dimmer, Loader, Label, Dropdown, Modal } from 'semantic-ui-react'

import UserItem from '../container_items/UserItem'
import UserList from '../containers/UserList'
import RevisionsAccordian from '../containers/RevisionsAccordian'

import DeliverablesEditContainer from '../containers/DeliverablesEditContainer'
import EditUsersForm from '../forms/EditUsersForm'
import EditProjectDetails from '../forms/EditProjectDetails'
import CompletedProject from '../forms/CompletedProject'

import IndivProjectHeader from '../container_items/IndivProjectHeader'


import '../css/individualProductPage.css'
import '../css/IndividualProjectHeader.css'

import { withRouter, Redirect } from 'react-router'

import DeliverablesContainer from '../containers/DeliverablesContainer'

class IndividualProject extends React.Component {
  componentDidCatch(error, info) {
    this.props.history.push('/dashboard')
  }
  render() {
    let data = (
      <div>

      <IndivProjectHeader projectId={this.props.id} />
      <div id="individual-page-container-content">

        <div id="outer-project-accordian">
          <RevisionsAccordian projectId={this.props.id}/>
        </div>

        <div id="deliverables-div">
          <DeliverablesContainer projectId={this.props.id} />
        </div>

     </div>

    </div>)

    return (
      <div>

      <IndivProjectHeader projectId={this.props.id} />
      <div id="individual-page-container-content">

        <div id="outer-project-accordian">
          <RevisionsAccordian projectId={this.props.id}/>
        </div>

        <div id="deliverables-div">
          <DeliverablesContainer projectId={this.props.id} />
        </div>

     </div>

    </div>
      // this.props.project && this.props.project.get_users.map(user => user.id).includes(this.props.userId) ? data : <Redirect to='/dashboard' />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    project: state.projects ? state.projects.find(project => project.id === parseInt(props.id)) : null,
    userId: state.user ? state.user.id : null
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IndividualProject));
