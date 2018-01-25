import React from 'react'
import { List, Segment, Dimmer, Loader } from 'semantic-ui-react'
import '../css/UserItem.css'

import {connect} from 'react-redux'

import UserItem from '../container_items/UserItem'


class UserList extends React.Component {
  render() {
    const usersList = this.props.users ? this.props.users.map( (user, i) => {
      return <UserItem key={i} name={`${user.first_name} ${user.last_name}`} position={user.position} image={user.image} />;
    }) : null
    
    return(
      <div id="users-container">
        <List celled id="user-container-border">
          {usersList}
        </List>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    // users: state.projects.length > 0 ? state.projects.find(project => project.id === parseInt(props.projectId)).get_users: null
  }
}

export default connect(mapStateToProps)(UserList);
