import React from 'react';
import { Icon, Step, Statistic, Image  } from 'semantic-ui-react';
import '../css/DeliverableItem.css';
import moment from 'moment';

class DelieverableUpcomingItem extends React.Component{
  fixDate = (date) => {
    return moment(date).format("MMM D").split(" ")
  }
  dateFromNow = (date) => {
    return moment(date).fromNow().split("in ")[1]
  }
  // onClick = () =>

  render() {
    const date = this.fixDate(this.props.deliverable.date);
    return(
      <div id="upcoming-deliverable-item-container">
        <div id="upcoming-deliverable-date-container">
          {/* <Statistic size='mini'>
            <Statistic.Value>{this.fixDate(this.props.deliverable.date)}</Statistic.Value>
            <p id="upcoming-deliverable-date">{this.dateFromNow(this.props.deliverable.date)}</p>
          </Statistic> */}
          <time datetime="2014-09-20" class="icon">
            <em>Saturday</em>
            <strong>{date[0]}</strong>
            <span>{date[1]}</span>
          </time>

        </div>
        <div id="upcoming-deliverable-description-container">
          <div id="upcoming-deliverable-header">
            <Image avatar src={this.props.deliverable.project.image} />
            <h4 class="deliverable-title">{this.props.deliverable.project.name}</h4>
          </div>
          <p id="deliveralbe-description-copy">{this.props.deliverable.description.length > 60 ? this.props.deliverable.description.substr(0, 60) + "\u2026" : this.props.deliverable.description }</p>
        </div>
      </div>
    )
  }
}

export default DelieverableUpcomingItem;
