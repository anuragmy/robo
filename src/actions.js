import {
  CHANGE_SEARCHFIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
} from './constants'
import axios from 'axios'

export const setSearchField = text => ({
  type: CHANGE_SEARCHFIELD,
  payload: text
})

export const requestRobots = () => async dispatch => {
  dispatch({ type: REQUEST_ROBOTS_PENDING })
  const result = await axios.get('https://jsonplaceholder.typicode.com/users')
  dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: result.data })
}
