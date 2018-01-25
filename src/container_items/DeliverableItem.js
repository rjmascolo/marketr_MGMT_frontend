import React from 'react';
import { Icon, Step  } from 'semantic-ui-react';
import '../css/DeliverableItem.css';
import moment from 'moment';

class DelieverableItem extends React.Component{
  fixDate = (date) => {
    return moment(date).format("MMM D").split(" ")
  }
  dateFromNow = (date) => {
    return moment(date).fromNow()
  }
  // changes calendar color based on date
  calendarColor = (date) => {
    const deliverDate = moment(date);
    const currentDate = moment();
    if ( currentDate.format("MMM Do") == deliverDate.format("MMM Do")) {
      return "red"
    } else if (currentDate.add(1, 'd').format("MMM Do") == deliverDate.format("MMM Do")){
      return "orange"
    } else {
      return "teal"
    }
  }

  render() {
    const date = this.fixDate(this.props.deliverable.date);
    return(
      <div id="deliverable-item-container">
          {this.props.deliverable.done ? (
            <div id="icon-container">
              <Icon name='check' size="huge" color="green" />
            </div>
          ) : (
            <div id="icon-container">
              <time datetime="2014-09-20" class="icon">
                <em>Saturday</em>
                <strong>{date[0]}</strong>
                <span>{date[1]}</span>
              </time>
            </div>
          )}
        <div id="deliverable-description-container">
          {this.props.deliverable.description}
        </div>
      </div>
    )
  }
}

export default DelieverableItem;
