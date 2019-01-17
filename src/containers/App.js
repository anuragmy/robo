import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSearchField } from '../actions'

import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'

import './App.css'

// parameter state comes from index.js provider store state(rootReducers)
const mapStateToProps = state => {
  return {
    searchField: state.searchField
  }
}

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.
const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value))
  }
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      robots: []
    }
  }

  componentDidMount () {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        this.setState({
          robots: users
        })
      })
  }

  render () {
    const { searchField, onSearchChange } = this.props
    const { robots } = this.state
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })
    return (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    )
  }
}

// action done from mapDispatchToProps will channge state from mapStateToProps
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
