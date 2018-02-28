import React from 'react'
import { Input, Button, Dropdown, Label } from 'semantic-ui-react'

import { createNewProject } from '../reducers/actions/actions'
import {connect} from 'react-redux'

import DatePicker from 'react-datepicker';
import moment from 'moment';

import { projectTypeData } from '../data/formData.js'
import { createProjectFormValidation, combineUsers } from '../services/helpers.js'


import 'react-datepicker/dist/react-datepicker.css';
import '../css/CreateNewProject.css'


import { withRouter } from 'react-router'

class CreateNewProject extends React.Component {
  state ={
      projectName:"",
      projectDescription: '',
      projectImage: '',
      projectType:'',
      projectCampaign: '',
      creativeDeliverables: '',
      projectUsers:[],
      deliverables:[
        {
          description: '',
          date: moment()
        }
      ],
      errors: {}
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const state = this.state
    const errors = createProjectFormValidation(state)
    console.log(Object.keys(errors))
    if (Object.keys(errors).length === 0) {

      this.props.createNewProject(state, this.props.current_user).then(x => this.props.history.push(`/projects/${x.id}`))

      this.props.close()
    } else {
      this.setState({errors: errors})
    }

  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleFileChange = (e) => {
    var file = e.target.files[0];

    this.setState({ projectFile: file });

  }

  handleDropDownChange = (data, e) => {
    this.setState({[e.name]: e.value})
  }

  handleUserDropDownChange = (data, e) => {
    this.setState({ projectUsers:  e.value })
  }

  onClick = (e) => {
    let usersChecked = this.state.projectUsers
    if (usersChecked.find( user => user.id === parseInt(e.target.name))) {
      this.setState({projectUsers: usersChecked.filter(user => user.id !== parseInt(e.target.name)) })
    } else {
      usersChecked.push(this.props.users.find( user => user.id === parseInt(e.target.name)))
      this.setState({projectUsers: usersChecked })
    }
  }

  handleDeliverableChange = (e, id) => {
    let descriptionChange = this.state.deliverables
    descriptionChange[id].description = e.target.value
    this.setState({deliverables: descriptionChange })
  }

  addDeliverable = () => {
    let newDeliverables = this.state.deliverables
    newDeliverables.push({description: '', date: moment()})
    this.setState({deliverables: newDeliverables})
  }

  datePickerChange = (date, dataId) => {
    let newDeliverables = this.state.deliverables;
    newDeliverables[dataId].date = date;
    this.setState({
      deliverables: newDeliverables
    })
  }

  render() {
    const errors = this.state.errors
    return(
      <div>
        <div className="ui form">
          <div id="create-project-data">
          <div className="field" id="group-field">
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
          <div id="group-field" >
            <div id="add-users-project">
              <Dropdown placeholder='Add Users' multiple search selection
                id="add-users-project"
                onChange={this.handleUserDropDownChange}
                value={this.state.projectUsers}
                options={this.props.users.map(user => {
                  return {key: user.id , value: user.id, text:`${user.first_name} ${user.last_name}`}
                })}
              />
                {errors.projectUsers ? <Label basic color='red' basic color='red' pointing>{errors.projectUsers}</Label> : null}
            </div>
            <div id="select-campaign-project">
              <Dropdown fluid selection
                placeholder='Select Campaign'
                name="projectCampaign"
                value={this.state.projectCampaign}
                onChange={this.handleDropDownChange}
                options={this.props.campaigns.map(campaign => Object.assign({text: campaign.name}, {value: campaign.id})) } />
                {errors.projectCampaign ? <Label basic color='red' pointing floated="right">{errors.projectCampaign}</Label> : null}
              </div>
          </div>
        </div>
          <div>
            <div className="field">
              <label>Creative Deliverable Overview</label>
              <textarea rows="2" name="creativeDeliverables" onChange={this.handleChange} value={this.state.creativeDeliverables} id="text-area" ></textarea>
              {errors.creativeDeliverables ? <Label basic color='red' pointing>{errors.creativeDeliverables}</Label> : null}
            </div>
            <div>
              <div id="create-project-deliverable-header">
                <h4>Create Deliverables</h4>
                <Button icon="add" circular onClick={this.addDeliverable} />
              </div>
              {this.state.deliverables.map( (deliverable, i) => {
                return (
                  <div className="field" id="deliverable-create-project-item">
                    <div className="field" id="project-deliverable-description">
                    <label>Creative Deliverable #{i+1} Description </label>
                    <input
                      type="text"
                      name="projectDescription"
                      onChange={(event) => this.handleDeliverableChange(event, i)}
                      value={this.state.deliverables[i].description}
                      placeholder="i.e. 3 mocks for Q1 banners"
                    />
                      {errors[`deliverable-${i}`] ? <Label basic color='red' pointing>{errors.projectDescription}</Label> : null}
                    </div>
                    <div className="field" >
                      <label>Date Due</label>
                      <DatePicker id={`${i}`} selected={this.state.deliverables[i].date} onChange={(date) => this.datePickerChange(date, i)}/>
                    </div>
                  </div>
                )
              })}
              <br/>
              <Button onClick={this.handleSubmit} color="teal" floated="right" id="button-margin" > Submit </Button>
          </div>
          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state, props) {


  let users = state.company ? combineUsers(state.projects[0].get_users, state.company.user_details) : []

  return {
    users: users ,
    campaigns: state.campaigns ? state.campaigns : [],
    current_user: state.user? state.user.id : ''
  }
}

function mapDispatchToProps(dispatch) {
  return {createNewProject: (project, userId) => dispatch(createNewProject(project, userId))}
}

export default withRouter(connect( mapStateToProps, mapDispatchToProps)(CreateNewProject));
