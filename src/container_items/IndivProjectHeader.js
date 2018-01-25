import React from 'react'

import {connect} from 'react-redux'

import { Image, Icon, List, Label, Dropdown, Modal, Accordion } from 'semantic-ui-react'

import DeliverablesEditContainer from '../containers/DeliverablesEditContainer'

import ProjectHeaderUserInfo from '../containers/ProjectHeaderUserInfo'

import { CompanyImage } from '../container_items/CompanyImage'

import EditUsersForm from '../forms/EditUsersForm'
import EditProjectDetails from '../forms/EditProjectDetails'
import CompletedProject from '../forms/CompletedProject'

import '../css/individualProductPage.css'
import '../css/IndividualProjectHeader.css'

class IndivProjectHeader extends React.Component {

  state = {
    modalType: null,
    modalOpen: false,
    accordionOpen: false
  }

  modalTrigger = (type) => {
    this.setState({ modalType: type, modalOpen: true })
  }

  show = () => this.setState({ modalOpen: true })

  close = () => this.setState({  modalOpen: false })

  closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => (data) => {
    this.setState({ closeOnEscape, closeOnRootNodeClick, modalOpen: true, modalType: data })
  }

  handleClick = () => this.setState( prevState => {
    return {accordionOpen: !prevState.accordionOpen}
  })

  render(){
    const { modalOpen, closeOnEscape, closeOnRootNodeClick } = this.state
    return(
      <div id="header">
        <div id="header-content">
          <div id="flex-between">
            <div id="title-description-image">
              <img id="project-image" src={this.props.project ? this.props.project.image: null} />
              <div>
                <p>{this.props.project ? this.props.project.campaign.name : null }</p>
                <h2 id="header-title">{this.props.project ? this.props.project.name : null }</h2>
              </div>
              <div id="label-div">
                <div>
                  <Label size="small" as='a' color='grey' tag>{this.props.project ? this.props.project.project_type : null }</Label>
                </div>
                <div id="project-completed">
                  {this.props.project && this.props.project.completed ? <p><Icon name="check circle" color="green" size="large"/> <b>Completed</b></p> : null}
                </div>
              </div>
            </div>
            <div id="company-div">
              <div id="company-div-inner">
              <b><p>Agencies</p></b>
                <p>{this.props.project ?
                  this.props.project.campaign.agencies.map( agency =>  {
                    return agency.description !== "client" ? <CompanyImage company={agency}/> : null
                  }
                ): null }</p>
              </div>
            </div>
            <div id="company-div">
              <div id="company-div-inner" >
                <b><p>Client</p></b>
                  <p>{this.props.project ?
                  this.props.project.campaign.agencies.map( agency =>  {
                    return agency.description === "client" ? <CompanyImage company={agency}/> : null
                  }
                  ): null }</p>
                </div>
            </div>
            <div>
              <Dropdown floating button className='icon' icon='setting' pointing="top right" >
                <Dropdown.Menu>
                  <Dropdown.Item text='Edit Project' onClick={() => this.closeConfigShow(true,false)("project")} />
                  <Dropdown.Item text='Edit Deliverables' onClick={() => this.modalTrigger("deliverables")} />
                  <Dropdown.Item text='Edit Users' onClick={() => this.modalTrigger("users")} />
                { this.props.project && !this.props.project.completed ?  <Dropdown.Item text='Mark Project Completed' onClick={() => this.modalTrigger("other")} /> : null}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <Accordion>
            <Accordion.Title active={this.state.accordionOpen}>
              <p onClick={this.handleClick} id="header-dropdown">
                More Details
                <Icon name='dropdown' />
              </p>
            </Accordion.Title>
            <Accordion.Content active={this.state.accordionOpen}>
              <div id="project-details">
                <div id="project-description">
                  <h4>Project Description</h4>
                  <p>{this.props.project ? this.props.project.description : null }</p>
                </div>
                <ProjectHeaderUserInfo projectId={this.props.projectId}/>
              </div>
            </Accordion.Content>
          </Accordion>
        <Modal
          open={this.state.modalOpen}
          closeOnEscape={closeOnEscape}
          closeOnRootNodeClick={closeOnRootNodeClick}
          onClose={this.close}
          closeIcon
          >
          <Modal.Header>
            {this.state.modalType === "deliverables" ? "Edit Deliverables" :
            this.state.modalType === "users" ? "Edit Users" :
            this.state.modalType === "project" ? "Edit Project Details" : "Project Complete" }
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {
               this.state.modalType === "deliverables" ?
              <DeliverablesEditContainer projectId={this.props.projectId} /> : this.state.modalType === "users" ?
              <EditUsersForm projectId={this.props.projectId} close={this.close} /> : this.state.modalType === "project" ?
              <EditProjectDetails projectId={this.props.projectId} close={this.close} /> :
              <CompletedProject projectId={this.props.projectId} close={this.close} />
             }
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    project: state.projects ? state.projects.find(project => project.id === parseInt(props.projectId)) : null
  }
}

export default connect(mapStateToProps)(IndivProjectHeader);
