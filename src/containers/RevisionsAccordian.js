import React, { Component } from 'react'
import { Accordion, Modal, Button, Segment, Dimmer, Loader, Tab } from 'semantic-ui-react'

import AddRevisionItem from '../forms/AddRevisionItem'
import CreateRevision from '../forms/CreateRevision'

import ProjectAccordianItem from '../container_items/projectAccordianItem'

import {connect} from 'react-redux'
import { withRouter } from 'react-router'

import '../css/projectAccordian.css'

class RevisionsAccordian extends Component {
  state = {
    revisionItemModal: {
      open: false,
      revisionId: ''
    },
    revisionModal: false
  }


  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }

  show = (e) => {
    this.setState({
        revisionItemModal:
      {
        open: true,
        revisionId: parseInt(e.target.id)
      }
    })
  }

  showRevision = () =>   this.setState({revisionModal: true})
  close = () => this.setState({ revisionItemModal:{open: false, revisionId: ''} })

  closeRevision = (id) => this.setState({ revisionModal: false })

  render() {
    const { activeIndex } = this.state

    const revisions = this.props.revisions? this.props.revisions.map( (revision, index ) => {
      return(
      { menuItem: revision.revision_type === "creative brief" ? "Creative Brief" : `Revision #${index}`, activeIndex: {index},
        render: () => <Tab.Pane attached={false}>
          <ProjectAccordianItem
            key={index}
            activeIndex={activeIndex}
            index={index}
            handleClick={this.handleClick}
            revision={revision}
            show={this.show}
            close={this.close}
            projectId={this.props.projectId}
          />
        </Tab.Pane> }
      )
    }): (null)
    return (
      <div id="accordion-container">
        <div id="accordian-header">
          <Button id="revision-button" onClick={this.showRevision} >New Revision</Button>
        </div>

        {/* <Accordion styled id="accordian-seman"> */}
          <Tab menu={{ secondary: true, pointing: true }} defaultActiveIndex={this.props.revisions? this.props.revisions.length-1 : 0} panes={revisions} id="revision-tabs" />

            <Modal size="small" open={this.state.revisionItemModal.open} onClose={this.close}>
               <Modal.Header>Enter In Documents</Modal.Header>
               <Modal.Content image>
                 <Modal.Description>
                   <AddRevisionItem
                     closeItemModule={this.close}
                     projectId={this.props.projectId}
                     revisionId={this.state.revisionItemModal.revisionId}
                     triggerRerender={this.triggerRerender}
                   />
                 </Modal.Description>
               </Modal.Content>
             </Modal>
             <Modal open={this.state.revisionModal} size="small" onClose={this.closeRevision}>
                <Modal.Header>Add New Revision</Modal.Header>
                <Modal.Content image>
                  <Modal.Description>
                    <CreateRevision
                      projectId={this.props.projectId}
                      closeRevision={this.closeRevision}
                      triggerRerender={this.triggerRerender}
                    />
                  </Modal.Description>
                </Modal.Content>
              </Modal>
        {/* </Accordion> */}
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    revisions: state.projects.length > 0 ?
    (state.projects.find(project => project.id === parseInt(props.projectId)).revisions.sort((a, b) => {
      if (a.created_at < b.created_at) {
        return -1
      }else if (a.created_at > b.created_at) {
      return 1
        } else {
      return 0
        }
    }) )
    : null
  }
}

export default withRouter(connect(mapStateToProps)(RevisionsAccordian));
