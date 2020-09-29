export const ADD_USER = 'ADD_USER';
export const ADD_STARRED = 'ADD_STARRED';
export const ADD_STARRED_TAG = 'ADD_STARRED_TAG';
export const ADD_TAG = 'ADD_TAG';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_STARRED = 'DELETE_STARRED';
export const UPDATE_STARRED_TAG = 'UPDATE_STARRED_TAG';

export const addUser = user => {
  return {
    type: ADD_USER,
    payload: user
  }
}

export const deleteUser = id => {
  return {
    type: DELETE_USER,
    id
  }
}

export const addStarred = starred => {
  return {
    type: ADD_STARRED,
    payload: starred
  }
}

export const addStarredTag = (id, tag) => {
  return {
    type: ADD_STARRED_TAG,
    id,
    tag
  }
}

export const deleteStarred = id => {
  return {
    type: DELETE_STARRED,
    id
  }
}

export const updateStarredTag = (id, arrTags) => {
  return {
    type: UPDATE_STARRED_TAG,
    id,
    arrTags
  }
}

export const addTag = tag => {
  return {
    type: ADD_TAG,
    payload: tag
  }
}