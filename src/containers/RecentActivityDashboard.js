import React from 'react'

import { Icon, Modal, Feed } from 'semantic-ui-react'

import '../css/DeliverableItem.css'

import { connect } from 'react-redux'

import RecentActivityFeedItem from '../container_items/RecentActivityFeedItem'

class RecentActivityDashboard extends React.Component {

  render() {
    const feedItems = this.props.notifications.map( notification => <RecentActivityFeedItem notification={notification}/> )
    return(
      <div id="recent-activity-container-outer">
        <div id="notification-header">
          <h3>Recent Activity</h3>
        </div>
          {feedItems.length > 0 ? <Feed id="notification-feed"> {feedItems} </Feed>  :
          <div id="notification-feed"><p>There has been no recent activity</p></div>}
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  let notifications = [];
  state.projects ? state.projects.forEach(project => {
    let users = project.get_users;
    return project.notifications.forEach( notification => {
      if( notification.user_id !== state.user.id) {
        let user = users.find(user => user.id === notification.user_id)
        notifications.push({...notification, project: project, user: user})
      }
    })
  }) : null
  return {
    notifications: notifications.sort( ( a, b) => {
      if (a.created_at > b.created_at) {
        return -1
      }else if (a.created_at < b.created_at) {
        return 1
      } else {
        return 0
        }
    })
  }
}

export default connect(mapStateToProps)(RecentActivityDashboard);
