import React from 'react'
import { Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import {  updateProject } from '../reducers/actions/actions'

class CompletedProject extends React.Component {

  handleClick = () => {
    this.props.updateProject({completed: true, id: parseInt(this.props.projectId)})
    this.props.close()
  }

  render() {
    return(
      <div>
        <div id="add-users-project">
          Are you sure you want to mark this project as being completed?
        </div>
        <Button id="edit-project-button" onClick={this.props.close} negative >No</Button>
        <Button id="edit-project-button" onClick={this.handleClick} positive labelPosition='right' icon='checkmark' content='Yes'/>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateProject: (project) => dispatch(updateProject(project))
  }
}

export default connect(null, mapDispatchToProps)(CompletedProject);
