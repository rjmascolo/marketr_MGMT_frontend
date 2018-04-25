import React from 'react'
import { Icon, Image, Button } from 'semantic-ui-react'
// import { Link } from 'react-router-dom';
import { Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { deleteComment, updateComment } from '../reducers/actions/actions'
import {connect} from 'react-redux'
import '../css/Comment.css'

import moment from 'moment'

import {stateToHTML} from 'draft-js-export-html';

import { convertFromRaw, EditorState, ContentState, convertToRaw } from 'draft-js';


class Comment extends React.Component {

  state = {
    edit:false,
    editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.comment.content)))
  }

  handleDelete = () => {
    this.props.deleteComment(this.props.comment.id, this.props.comment.revision_id, parseInt(this.props.projectId))
  }

  handleEdit= () => {
    var editState = !this.state.edit
    this.setState({edit:editState})
  }

  onChange = (editorState) => this.setState({editorState});

  updateComment = () => {
    let props = this.props
    var convertedData = convertToRaw(this.state.editorState.getCurrentContent())
    let comment = { ...props.comment, ...{content:convertedData}}
    this.props.updateComment(comment, props.projectId)
    this.handleEdit()
  }

  convertCommentFromJSONToText = (text) => {
    var x = stateToHTML(convertFromRaw(JSON.parse(text)))
    return x
  }

  render() {
  return (
    <div id="single-comment">
      <div id="single-comment-header">
          <div id="comment-username">
            <Image avatar src={this.props.comments_user ? this.props.comments_user.image : null} />
            <p id="user-name-text">{this.props.comments_user ? this.props.comments_user.first_name : null} {this.props.comments_user ? this.props.comments_user.last_name : null}</p>
            <p id="timestamp-text" > &#9702; {moment(this.props.comment.created_at).fromNow()}</p>
          </div>
        <div>
          {this.state.edit? <Button id="smaller-button" color="teal" size='small' onClick={this.updateComment}>Save</Button>: null}
          { this.props.comments_user && this.props.current_user.id === this.props.comments_user.id ? (
            <Button.Group basic size='small'>
              <Button icon onClick={this.handleEdit} color="red" compact circular negative>
                <Icon name="edit" color="teal" />
              </Button>
              <Button icon onClick={this.handleDelete} color="red" compact circular negative>
                <Icon name="delete" color="red" />
              </Button>
            </Button.Group>
          ) : null}
        </div>
      </div>
        {this.state.edit ?
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
        :
        <div id="comment-div">
          <div dangerouslySetInnerHTML={{ __html: this.convertCommentFromJSONToText(this.props.comment.content)}}></div>
        </div>
        }
    </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    comments_user: state.users ? state.users.find( user => user.id === props.comment.user_id) : null,
    current_user: state.user ? state.user : null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteComment: (commentId, revisionId, projectId) => dispatch(deleteComment(commentId, revisionId, projectId)),
    updateComment: (comment, projectId) => dispatch(updateComment(comment, projectId))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(Comment);
