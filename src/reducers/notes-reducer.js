var count = 0;

const initialState = [
  {
    index: count,
    topic: 'Hello, world!',
    content: 'Create your own notes!',
    id: 1
  }
]

count++;

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'ADD':
      return state.concat(action.data);
    case 'EDIT':
      return state.slice(0, action.data.index).concat(action.data) + 
                 state.slice(action.data.index+1);
    case 'REMOVE':
      return state.filter(note => note.index != action.index);
    default: // if none of the above matches, code comes here
    return state
  }
}

export const addNote = (note) => {
  var id;
  if (note._id) 
      id = note._id;
  else
      id = count+1;
  return {
      type: 'ADD', 
      data: {
          index: count++,
          topic: note.topic,
	  content: note.content,
	  id: note._id
      }
  }
}

export const removeNote = (note) => {
   return {
     type: 'REMOVE',
     index: note.index
   }
}

export const editNote = (note) => {
   return {
      type: 'EDIT',
      data: {
          index: note.index,
	  topic: note.topic,
	  content: note.content,
	  id: note.id
      }
   }
}

export default notesReducer;
