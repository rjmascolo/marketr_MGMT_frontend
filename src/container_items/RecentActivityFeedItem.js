import React from 'react'
import { Feed, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import moment from 'moment'


class ProjectItem extends React.Component {
  render() {
  const {user, notification_type, project, created_at} = this.props.notification

  return (
    <Feed.Event id="notification-item">
      <Feed.Label>
        <img src={user ? user.image : null} />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary id="notification-text" >
          <b>{`${user ? user.first_name :null} ${user ? user.last_name: null}`}</b> added a {notification_type} to <Link to={`/projects/${project.id}`}>{project.name}</Link>
          <Feed.Date>{moment(created_at).fromNow()}</Feed.Date>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
    )
  }
}

export default ProjectItem
