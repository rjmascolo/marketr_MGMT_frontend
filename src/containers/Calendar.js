import React from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../css/dashboard.css'

import {connect} from 'react-redux'
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Calendar extends React.Component{

  revisedEventData = (deliverables) => {
    let i = 0;
    return deliverables.map( deliverable => {
      let dateNums = deliverable.date.split('-').map(x => parseInt(x))
      i += 1
      return {
        id: deliverable.id,
        title: deliverable.description,
        start: new Date (dateNums[0], (dateNums[1]-1), dateNums[2], 0, i, 0),
        end: new Date (dateNums[0], (dateNums[1]-1) , dateNums[2], 0, (i+1), 0)
      }
    })
  }

  render() {
  const events = this.props.deliverables? this.revisedEventData(this.props.deliverables) : null;
  let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
    return(
    <div id="calendar">
      <div id="calendar-inner-div">
      <BigCalendar
        events={events}
        views={allViews}
        step={60}
        startAccessor='startDate'
        endAccessor='endDate'
      />
      </div>
    </div>
    )
  }
}


function mapStateToProps(state, props) {
  return {
    deliverables: state.projects.length > 0 ? (
      [].concat.apply([],state.projects.map(project =>  project.deliverables)) ): null
  }
}

export default connect(mapStateToProps)(Calendar);
