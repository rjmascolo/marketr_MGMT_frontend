import React from 'react'

import { Icon, Modal } from 'semantic-ui-react'

import '../css/DeliverableItem.css'

import { connect } from 'react-redux'

import DeliverableUpcomingItem from '../container_items/DeliverableUpcomingItem'

class DeliverablesUpcoming extends React.Component {

  render() {
    const deliverables = this.props.deliverables.map( (deliverable, i) => {
      return <DeliverableUpcomingItem key={i} deliverable={deliverable} />
    })
    return(
      <div id="upcoming-deliverable-container-outer">
        <div id="upcoming-deliverable-container-inner">
        <h3>Upcoming Deliverables</h3>
        <div id="upcoming-deliverable-container">
          {deliverables}
        </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  let deliverableCombined = []
  if (state.projects.length > 0) {
    state.projects.map(project => {
      project.deliverables.map ( deliverable => {
        !deliverable.done ? deliverableCombined.push( {...deliverable, project: project}) : null
      })
    })
  }
  return {
    deliverables: state.projects.length > 0 ? deliverableCombined.sort( ( a, b) => {
      if (a.date < b.date) {
        return -1
      }else if (a.date > b.date) {
      return 1
        } else {
      return 0
        }
    }).slice(0,4) : []
  }
}

export default connect(mapStateToProps)(DeliverablesUpcoming);
