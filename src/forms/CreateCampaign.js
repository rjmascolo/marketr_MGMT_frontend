import React from 'react'
import { Input, Button, Checkbox, Label, Dropdown } from 'semantic-ui-react'

import { connect } from 'react-redux'

import { createCampaign } from '../reducers/actions/actions'

import { createCampaignFormValidation } from '../services/helpers.js'


import DatePicker from 'react-datepicker';
import moment from 'moment';



class CreateCampaign extends React.Component {

  state = {
      name: '',
      description: '',
      current_company: this.props.current_company,
      startDate: moment(),
      endDate: moment(),
      campaignCompanies: [],
      errors: {}
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let x = this.state
    const errors = createCampaignFormValidation(x)
    if (Object.keys(errors) === undefined) {
      this.props.createCampaign(
        {
          name: x.name,
          current_company: x.current_company,
          description: x.description,
          launch_date:x.endDate._d,
          end_date: x.startDate._d,
          campaignCompanies: x.campaignCompanies
        })
      this.props.close()
    } else {
      this.setState({errors: errors})
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  datePickerChange = (date, string) => {
    this.setState({ [ string ] : date })
  }

  handleUserDropDownChange = (data, e) => {
    this.setState({ campaignCompanies:  e.value })
  }

  render() {
    const errors = this.state.errors
    return(
      <div>
        <form onSubmit={this.handleSubmit} className="ui form" >
          <div className="field">
            <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="i.e. 3 mocks for Q1 banners"
            />
            {errors.name ? <Label basic color='red' pointing>{errors.name}</Label> : null}
            </div>
            <div id="campaign-dates">
              <div className="field" id="campaign-date-margins" >
                <label>Start Date</label>
                <DatePicker
                  selected={this.state.startDate}
                  onSelect={(date, string) => this.datePickerChange(date, "startDate")}/>
              </div>
              <div className="field" >
                <label>End Date</label>
                <DatePicker
                  selected={this.state.endDate}
                  name="end_date"
                  onSelect={(date, event) => this.datePickerChange(date, "endDate")}/>
              </div>
              <div>
                <Dropdown placeholder='Add Companies' multiple search selection
                  id="add-companies-campaign"
                  onChange={this.handleUserDropDownChange}
                  value={this.state.campaignCompanies}
                  options={this.props.companies.map(company => {
                    return {key: company.id , value: company.id, text: company.name }
                  })}
                />
              </div>
            </div>
            <div className="field">
            <label>Campaign Description </label>
            <input
              type="text"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
              placeholder="i.e. 3 mocks for Q1 banners"
            />
            {errors.description ? <Label basic color='red' pointing>{errors.description}</Label> : null}

            </div>
            </div>
          <Button onClick={this.handleSubmit} floated="right" color="teal" id="button-margin" >Save</Button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    current_company: state.projects.length > 0 ? state.company.id : null ,
    companies: state.projects.length > 0 ? state.projects[0].campaign.agencies.filter(company => company.id !== state.company.id) : []
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createCampaign: (data) => dispatch(createCampaign(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCampaign);
