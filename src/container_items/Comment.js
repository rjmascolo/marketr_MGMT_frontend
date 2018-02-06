import React from 'react'
import { Icon, Image, Button } from 'semantic-ui-react'
// import { Link } from 'react-router-dom';

import { deleteComment } from '../reducers/actions/actions'
import {connect} from 'react-redux'
import '../css/Comment.css'

import moment from 'moment'

// import { EditorState, Editor } from 'draft-js';

import {stateToHTML} from 'draft-js-export-html';

import { convertFromRaw } from 'draft-js';


class Comment extends React.Component {

  handleDelete = () => {
    this.props.deleteComment(this.props.comment.id, this.props.comment.revision_id, parseInt(this.props.projectId))
  }

  handleEdit= () => {

  }

  convertCommentFromJSONToText = (text) => {
    var x = stateToHTML(convertFromRaw(JSON.parse(text)))
    return x
  }

  render() {
    console.log(this.props)
  return (
    <div id="single-comment">
      <div id="single-comment-header">
          <div id="comment-username">
            <Image avatar src={this.props.comments_user ? this.props.comments_user.image : null} />
            <p id="user-name-text">{this.props.comments_user ? this.props.comments_user.first_name : null} {this.props.comments_user ? this.props.comments_user.last_name : null}</p>
            <p id="timestamp-text" > &#9702; {moment(this.props.comment.created_at).fromNow()}</p>
          </div>
        <div>
          { this.props.comments_user && this.props.current_user.id === this.props.comments_user.id ? (
            <Button.Group basic size='small'>
              <Button icon onClick={this.handleDelete} color="red" compact circular negative>
                <Icon name="delete" color="red" />
              </Button>
            </Button.Group>
          ) : null}
        </div>
      </div>
      <div id="comment-div">
        <div dangerouslySetInnerHTML={{ __html: this.convertCommentFromJSONToText(this.props.comment.content)}}></div>
      </div>
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
  return {deleteComment: (commentId, revisionId, projectId) => dispatch(deleteComment(commentId, revisionId, projectId))}
}

export default connect( mapStateToProps, mapDispatchToProps)(Comment);
