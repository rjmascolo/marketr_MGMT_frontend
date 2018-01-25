import React from 'react'
import { Item, Button, Modal, Header } from 'semantic-ui-react'

import ProjectItem from '../container_items/ProjectItem'
import CreateNewProject from '../forms/CreateNewProject'
import '../css/dashboard.css'

import {connect} from 'react-redux'

class Projects extends React.Component {

  state = {
    activeModal: false
  }

  show = () => this.setState({ activeModal: true})
  close = () => this.setState({ activeModal: false })

  render() {
    const projects = this.props.projects ? this.props.projects.map( (project,i) => {
      return <ProjectItem key={i} project={project}/>
    }): null
    return (
      <div id="dashboard-projects">
        <div id="dashboard-projects-header">
          <h1>Current Projects</h1>
        </div>
        <Item.Group divided id="no-margin">
          {projects}
        </Item.Group>
      </div>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

export default connect(mapStateToProps)(Projects);
