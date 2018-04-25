import React from 'react'
import { Button } from 'semantic-ui-react'

import ReactDOM from 'react-dom';
import { EditorState } from 'draft-js';
import { Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { createComment } from '../reducers/actions/actions'

import {convertToRaw} from 'draft-js';

import {connect} from 'react-redux'
import '../css/CommentForm.css'

class CommentForm extends React.Component {
  state ={
      comment:'',
      editorState: EditorState.createEmpty()
  }


  handleSubmit = (e) => {
    e.preventDefault()
    var convertedData = convertToRaw(this.state.editorState.getCurrentContent())
    this.props.createComment(
      {
        content: convertedData,
        user_id: this.props.userId,
        revision_id: parseInt(this.props.revisionId)
      },
        this.props.projectId
      )
    this.setState({editorState: EditorState.createEmpty()})
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onChange = (editorState) => this.setState({editorState});

  render() {
    return(
      <div>
          <div id="comment-form-div">

            <Editor
              editorState={this.state.editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="editer-content"
              // toolbarClassName="toolbar-class"
              onEditorStateChange={this.onChange}
              toolbar={{
                options: ['inline', 'list','colorPicker', 'link', 'emoji', 'image'],
                inline: { inDropdown: true },
                list: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
              }}
            />
          </div>
          <div id="comment-button-div">
            <Button onClick={this.handleSubmit} id="comment-submit-button" color="teal">Submit</Button>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {userId: state.user.id}
}

function mapDispatchToProps(dispatch) {
  return {createComment: (comment,projectId) => dispatch(createComment(comment, projectId))}
}


export default connect( mapStateToProps, mapDispatchToProps)(CommentForm);
