import React, { Component } from 'react'


import { logOut } from './reducers/actions/actions'
import {connect} from 'react-redux'

import { Link, NavLink } from 'react-router-dom';

import { withRouter } from 'react-router-dom'

import SearchBar from './forms/SearchBar'
import CreateNewProject from './forms/CreateNewProject'
import CreateCampaign from './forms/CreateCampaign'

import { Icon, Dropdown, Modal, Menu } from 'semantic-ui-react'
import './css/dashboard.css'

class NavBar extends Component {

  state = {
    modalType: 'campaign',
    modalOpen: false,
    accordionOpen: false,
  }

  handleClick = () => {
    this.props.history.push('/login')
    this.props.logOut()
  }

  modalTrigger = (type) => {
    this.setState({ modalType: type, modalOpen: true })
  }

  show = () => this.setState({ modalOpen: true })

  close = () => this.setState({  modalOpen: false })


  render() {
    return (
      <div>
          <Menu size='large'>


            <div class="item">
              <NavLink to={`/dashboard`}><Icon name="home" size="large" id="home-nav-link" /></NavLink>
            </div>
            {/* <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} /> */}

            <Menu.Menu position='right'>
              <Menu.Item>
                <SearchBar />
              </Menu.Item>
              <Dropdown item icon="setting" id="icon-larger" >
                <Dropdown.Menu>
                  <Dropdown.Item text='Create Project' onClick={() => this.modalTrigger("project")} />
                  <Dropdown.Item text='Create New Campaign' onClick={() => this.modalTrigger("campaign")} />
                </Dropdown.Menu>
              </Dropdown>

              <Menu.Item>
                {!this.props.user ?
                  <div onClick={this.handleClick} className="ui primary button" id="login-button">Log In</div> :
                  <div onClick={this.handleClick} className="ui button">Log Out</div> }
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          <Modal open={this.state.modalOpen} onClose={this.close}>
            <Modal.Header>
              {this.state.modalType === "deliverables" ? "Edit Deliverables" :
              this.state.modalType === "users" ? "Edit Users" :
              this.state.modalType === "project" ? "Create A New Project" : "Project Complete" }
            </Modal.Header>
            <Modal.Content scrolling >
              <Modal.Description>
                {
                 this.state.modalType === "campaign" ?
                <CreateCampaign close={this.close} /> : this.state.modalType === "project" ?
                <CreateNewProject close={this.close} /> : null
               }
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    projects: state.user.projects
  }
}

function mapDispatchToProps(dispatch) {
  return {logOut: () => {dispatch(logOut())}}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
