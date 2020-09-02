const initialState = [
  { 
    topic: 'Hello, world!',
    content: 'Create your own notes!',
    id: 1
  }
]

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'ADD':
      return state
    case 'EDIT':
      return state
    case 'REMOVE':
      return state
    default: // if none of the above matches, code comes here
    return state
  }
}

export default notesReducer;
