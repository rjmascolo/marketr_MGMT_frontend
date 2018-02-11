import React from 'react'
import { Item, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import moment from 'moment'

import { sortDeliverableByData, restrictCharToLength } from '../services/helpers.js'


class ProjectItem extends React.Component {
  render() {
    const project = this.props.project
    const nextDeliverables = sortDeliverableByData(project.deliverables.filter(deliverable => !deliverable.done)).slice(0,2)
  return (
      <Item divided id="no-margin">
          <Item.Content>
            <div id="space-between">
              <div id="dashboard-title-description-image">
                <Link to={`/projects/${project.id}`}>
                  <img id="dashboard-project-image" src={project.image} />
                </Link>
                <div>
                  <p>{project.campaign.name}</p>
                  <Link to={`/projects/${project.id}`}><h2 id="header-title">{project.name}</h2></Link>
                </div>
              </div>
              <div id="dashboard-label-div-project">
                <div>
                  <Label size="mini" as='a' color='grey' tag>{project.project_type}</Label>
                </div>
              </div>
            </div>
            {nextDeliverables.length > 0 ? (
            <div id="due-next">
              <div>
                <b>Due Next:</b>
              </div>
              <div id ="due-next-details">
                {nextDeliverables.map( deliverable => {
                  return <p>{deliverable.description.length > 23 ?
                  <p> <i><b>{moment(deliverable.date).format("M/D")}</b></i> {restrictCharToLength(deliverable.description, 20)} </p>
                    : <p><i><b>{moment(deliverable.date).format("M/D")}</b></i> {deliverable.description}</p> }</p>
                })}
              </div>
            </div>): null
          }
          </Item.Content>
        </Item>
    )
  }
}

export default ProjectItem
