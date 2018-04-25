import React from 'react'
import { Item, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import { deleteFile } from '../reducers/actions/actions'
import {connect} from 'react-redux'



class AssetItem extends React.Component {

  deleteFile = () => {
    this.props.deleteItem(this.props.item.id, this.props.projectId)
  }

  fileType = (fileName) => {
    const fileType = fileName.split(".")[1]
    const imageFileEndings = ['jpg', 'jpeg', 'png', 'gif', 'svg']
    if( imageFileEndings.includes(fileType) ) {
      return <Icon name="image" color="teal"/>
    } else {
      return <Icon name='file' color="teal" />
    }
  }

  render() {
  return (
    <Label image>
      {this.fileType(this.props.item.file_name)}
     <a href={this.props.item.file_url} target="_blank" id="asset-item" >{this.props.item.file_name}</a>
    <Icon name='delete' onClick={this.deleteFile} />
    </Label>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {deleteItem: (itemId, projectId) => dispatch(deleteFile(itemId, projectId))}
}

export default connect( null, mapDispatchToProps)(AssetItem);
