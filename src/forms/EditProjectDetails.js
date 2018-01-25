import React from 'react'
import { Input, Button, Checkbox, Dropdown, Label } from 'semantic-ui-react'

import {  updateProject } from '../reducers/actions/actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {editProjectValidation} from '../services/helpers.js'

import { projectTypeData } from '../data/formData.js'

import '../css/RevisionCreateForm.css'


class EditProjectDetails extends React.Component {

  state ={
      projectName: this.props.project.name,
      projectDescription:this.props.project.description,
      projectType:this.props.project.project_type,
      projectImage: this.props.project.image,
      errors:{}

  }


  handleSubmit = (e) => {
    e.preventDefault()
    const state = this.state
    const errors = editProjectValidation(state)
    if (Object.keys(errors).length < 1) {
      this.props.updateProject(
        {
          id: this.props.projectId,
          name:state.projectName,
          description: state.projectDescription,
          project_type: state.projectType,
          image: state.projectImage,
          updateType: "main-details"
        }
      )
      this.props.close()
    } else {
      this.setState( {errors: errors} )
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  handleDropDownChange = (data, e) => {
    this.setState({[e.name]: e.value})
  }


  render() {
    const errors = this.state.errors
    return(
      <div>
        <form onSubmit={this.handleSubmit} className="ui form" >
          <div>
            <div id="edit-project-data">
            <div className="field" id="flex-grow2">
              <label>Project Name</label>
              <input type="text" name="projectName" onChange={this.handleChange} value={this.state.projectName}/>
               {errors.projectName ? <Label basic color='red' pointing>{errors.projectName}</Label> : null}
            </div>
            <div className="field"  id="flex-grow">
              <Dropdown fluid selection
                placeholder='Select Content Type'
                name="projectType"
                value={this.state.projectType}
                onChange={this.handleDropDownChange}
                options={projectTypeData} />
                {errors.projectType ? <Label basic color='red' pointing>{errors.projectType}</Label> : null}
            </div>
          </div>
          <div className="field">
            <label>Project Description</label>
            <input type="text" name="projectDescription" onChange={this.handleChange} value={this.state.projectDescription}/>
            {errors.projectDescription ? <Label basic color='red' pointing>{errors.projectDescription}</Label> : null}
          </div>
          <div className="field">
            <label>Project Image</label>
            <Input label='Enter URL' placeholder='image-url.com' name="projectImage" onChange={this.handleChange} value={this.state.projectImage} />
              {errors.projectImage ? <Label basic color='red' pointing>{errors.projectImage}</Label> : null}
          </div>
          <Button id="edit-project-button" onClick={this.handleSubmit} color="teal" floated="right" > Submit </Button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    project: state.projects ? state.projects.find(project => project.id === parseInt(props.projectId)) : null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateProject: (project) => dispatch(updateProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectDetails);
