import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'

import { withRouter } from 'react-router'

import {connect} from 'react-redux'

import { restrictCharToLength } from '../services/helpers.js'


class SearchBar extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    const x = this.props.history.location.pathname.split("/")
    x[1] === "projects" ? this.props.history.push(`${result.id}`) : this.props.history.push(`projects/${result.id}`)
    this.setState({ value: '' })
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.source, isMatch),
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state
    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    projects: state.projects ? state.projects : null,
    source: state.projects ? state.projects.map( project => {
      return {
        title: project.name,
        // description: project.campaign.name,
        description: restrictCharToLength(project.description, 30),
        image: project.image,
        id: project.id
      }
    }): null
  }
}

export default withRouter(connect( mapStateToProps )(SearchBar));
