import React from 'react'
import { Image, List } from 'semantic-ui-react'
import '../css/UserItem.css'

const UserItem = ({name,position,image}) => (
    <List.Item>
      <Image avatar src={image} />
      <List.Content>
        <List.Header>{name}</List.Header>
         <p id="user-position">{position}</p>
      </List.Content>
    </List.Item>
)

export default UserItem;
