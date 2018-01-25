import React from 'react'
import { Input, Button, Label } from 'semantic-ui-react'

import { createRevisionAsset } from '../reducers/actions/actions'
import {connect} from 'react-redux'

class AddRevisionItem extends React.Component {
  state ={
      file_text:"",
      file_upload: null,
      link:'',
      errors: false
  }

  handleFileSubmit = (e) => {
    e.preventDefault()

    var file = this.state.file_upload
    var item = "file"

    if (file) {
      var formData = new FormData();

      formData.append("revision_item[file_upload]", file);
      formData.append("revision_item[item_type]", item);
      formData.append("revision_item[revision_id]", this.props.revisionId)
      formData.append("revision_item[file_name]", file.name)
      formData.append("revision_item[user_id]", this.props.user.id)
      formData.append("revision_item[project_id]", parseInt(this.props.projectId))

      this.props.createRevisionAsset(formData, parseInt(this.props.projectId))

      this.setState({ file_upload: null, file_text:""})
      this.props.closeItemModule()
    } else {
      this.setState({errors: true})
    }

  }

  handleLinkSubmit = (e) => {
    e.preventDefault()
    this.props.createRevisionAsset({file: this.state.link, item_type: 'link', revision_id: this.props.revisionId,})
    this.setState({link: ''})
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleFileChange = (e) => {
    var file = e.target.files[0];

    this.setState({ file_text: e.target.value, file_upload: file });

  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleFileSubmit}>
          <h4>Enter File</h4>
          <input name="file" type="file" onChange={this.handleFileChange} value={this.state.file_text}/>
          <Button type="submit" color="teal">Upload</Button>
        </form>
        {this.state.errors ? <Label basic color='red' pointing>You need to enter a file</Label> : null}
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user ? state.user : null
  }
}

function mapDispatchToProps(dispatch) {
  return {createRevisionAsset: (item, projectId) => dispatch(createRevisionAsset(item, projectId))}
}

export default connect( mapStateToProps, mapDispatchToProps)(AddRevisionItem);
