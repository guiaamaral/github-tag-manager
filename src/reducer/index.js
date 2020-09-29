import { combineReducers } from 'redux';
import {
  ADD_USER,
  ADD_STARRED,
  ADD_STARRED_TAG,
  ADD_TAG,
  DELETE_USER,
  DELETE_STARRED,
  UPDATE_STARRED_TAG
} from '../actions';

const usersInitialState = localStorage.getItem('@github-tag-manager/users') !== null
  ? JSON.parse(localStorage.getItem('@github-tag-manager/users'))
  : ''

const starredInitialState = localStorage.getItem('@github-tag-manager/starred') !== null
  ? JSON.parse(localStorage.getItem('@github-tag-manager/starred'))
  : ''

const tagsInitialState = localStorage.getItem('@github-tag-manager/tags') !== null
  ? JSON.parse(localStorage.getItem('@github-tag-manager/tags'))
  : ['Java','Javascript','Python','Typescript','Node','React','React Native', 'Vue','Django', 'Flask', 'Spring']

const userStore = (state = usersInitialState, action) => {
  switch(action.type) {
    case ADD_USER :
      localStorage.setItem('@github-tag-manager/users', JSON.stringify([
        ...state,
        action.payload
      ]));
      return [
        ...state,
        action.payload
      ]
    case DELETE_USER :
      localStorage.setItem('@github-tag-manager/users', JSON.stringify(state.filter(item => item.id !== action.id)));
      return state.filter(item => item.id !== action.id)
    default :
      return state
  }
}

const starredStore = (state = starredInitialState, action) => {
  switch(action.type) {
    case ADD_STARRED :
      localStorage.setItem('@github-tag-manager/starred', JSON.stringify([
        ...state,
        action.payload
      ]));
      return [
        ...state,
        action.payload
      ]
    case DELETE_STARRED :
      localStorage.setItem('@github-tag-manager/starred', JSON.stringify(state.filter(item => item.id !== action.id)));
      return state.filter(item => item.id !== action.id)
    case ADD_STARRED_TAG :
      const newRepo = state.filter(repo => repo.repoid === action.id)[0];
      newRepo.tags.push(action.tag)
      localStorage.setItem('@github-tag-manager/starred', JSON.stringify([
        ...state.filter(repo => repo.repoid !== action.id),
        newRepo
      ]))
      return [
        ...state.filter(repo => repo.repoid !== action.id),
        newRepo
      ]
    case UPDATE_STARRED_TAG :
      console.log(action.arrTags)
      const updateRepo = state.filter(repo => repo.repoid === action.id)[0];
      updateRepo.tags = action.arrTags
      localStorage.setItem('@github-tag-manager/starred', JSON.stringify([
        ...state.filter(repo => repo.repoid !== action.id),
        updateRepo
      ]))
      return [
        ...state.filter(repo => repo.repoid !== action.id),
        updateRepo
      ]
    default :
      return state
  }
}

const tagStore = (state = tagsInitialState, action) => {
  switch(action.type) {
    case ADD_TAG :
      localStorage.setItem('@github-tag-manager/tags', JSON.stringify([
        ...state.filter(tag => tag !== action.payload),
        action.payload
      ]))
      return [
        ...state.filter(tag => tag !== action.payload),
        action.payload
      ]
    default :
      return state
  }
}

export default combineReducers({
  users: userStore,
  starred: starredStore,
  tags: tagStore
});