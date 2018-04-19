import React from 'react'
import { Accordion, Button, Item, Icon } from 'semantic-ui-react'

import CommentForm from '../forms/CommentForm'
import Comment from '../container_items/Comment'
import AssetItem from '../container_items/AssetItem'

const ProjectAccordianItem = (props) => {
  console.log(props.revision.revision_items)
  return (
    <div>
      <div id="revision-description" >
        <p>{props.revision.description}</p>
      </div>

      <div>
        <div id="asset-container">
        <div>
          {props.revision.revision_items.map( (item, i) => <AssetItem key={i} item={item} projectId={props.projectId} />)}
        </div>
            <Icon id={props.revision.id} name="add" circular inverted color='teal' onClick={(e) => props.show(e)}/>
        </div>
      </div>
      <div id="comment-container">
        {props.revision.comments.map( (comment, i) => <Comment key={i} comment={comment} projectId={props.projectId} />)}
      </div>
        <CommentForm revisionId={props.revision.id} projectId={props.projectId} id="" />
    </div>
 )
}

export default ProjectAccordianItem;
