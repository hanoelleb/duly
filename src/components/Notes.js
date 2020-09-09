import React, {useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import { addNote, editNote, removeNote } from '../reducers/notes-reducer';

const Notes = () => {
    return (
    <div>
        <h1>Notes</h1>
	<ConnectedForm />
	<ConnectedNoteList />
    </div>
    )
}

class NoteForm extends React.Component {
    constructor(props) {
        super(props);
	this.handleChange = this.handleChange.bind(this);
	this.handleEditorChange = this.handleEditorChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleClick = this.handleClick.bind(this);
	this.state = ({topic: '', content: '', toggle: false});
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    handleEditorChange = (content, editor) => {
	 this.setState( { content: content } );
    }

    handleSubmit(e) {
	e.preventDefault();

        const data = { topic: this.state.topic, content: this.state.content };

	if (this.props.user) {
	    const id = this.props.user._id;
	    const token = this.props.token;
	    const url = 'http://localhost:5000/'+id+'/notes/add';

	    fetch(url, {
	        method: 'POST',
		headers: {
		   'Authorization': this.props.token,
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'   
		},
		body: JSON.stringify(data)
	    }).then( response => response.json() )
              .then( data => {
	          console.log(data.note);
		  this.props.addNote(data.note);
	          this.setState({topic: '', content: '', toggle: false});
	      })
	} else {
	    this.props.addNote( data );
            this.setState({topic: '', content: '', toggle: false});
	}
    }

    handleClick() {
	var val = !this.state.toggle;
        this.setState({ toggle: val });
    }

    render() {
	if (this.state.toggle) {
	    return (
            <div>
                <button onClick={this.handleClick}>Cancel</button>

                <form onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='Topic' name='topic'
                        value={this.state.topic} onChange={this.handleChange}
                    />
		    <Editor name='content'
                        initialValue="<p>Your notes...</p>"
		        value = {this.state.content}
                        init={{
                            height: 250,
	                    width: 500,
                            menubar: false,
                            plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                      'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                       }}
                       onEditorChange={this.handleEditorChange}
                    />
		    <input type='submit' value='Add note'></input>
                </form>
            </div>
	    )
	}
        return (
	    <div>
		<button onClick={this.handleClick}>+Note</button>
            </div>
	)
    }
}

class NoteList extends React.Component {
    constructor(props) {
        super(props);
	this.renderNote = this.renderNote.bind(this);
    }

    componentDidMount() {
	if (this.props.user) {
	const url = 'http://localhost:5000/' + this.props.user._id + '/notes';
        console.log(url);
            fetch(url, {
	        headers: {
                   'Authorization': this.props.token,
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
                },
	    }).then(response => response.json())
		.then( data => {
		    var notes = data.notes;
                    notes.forEach(note => this.props.addNote(note));
		});
	}
    }

    renderNote(note) {
        return (
             < ConnectedNote note={note} />
	)
    }

    render() {
        return (
	    <div>
                <h2>Your notes!</h2>
	        {this.props.notes.map(note => this.renderNote(note) ) }
            </div>
	)
    }
}

class Note extends React.Component {
   
    constructor(props) {
        super(props);
	this.handleChange = this.handleChange.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	this.handleRemove = this.handleRemove.bind(this);
        this.handleClick = this.handleClick.bind(this);

	this.state = ({topic: '', content: '', toggle: false});
    }

    componentDidMount() {
        this.setState({topic: this.props.note.topic, 
		content: this.props.note.content});
    }
    
    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    handleEditorChange = (content, editor) => {
         this.setState( { content: content } );
    }

    handleRemove() {
	const data = { id : this.props.note.id };  
	this.props.removeNote(this.props.note);
        if (this.props.user) {
	    const id = this.props.user._id;
            const token = this.props.token;
            const url = 'http://localhost:5000/'+id+'/notes/remove';

            fetch(url, {
                method: 'POST',
                headers: {
                   'Authorization': this.props.token,
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then( response => response.json())
	}
	this.setState({topic: this.props.note.topic,
                       content: this.props.note.content});
    }

    handleSubmit(e) {
        e.preventDefault();

        const data = { id: this.props.note.id, 
		index: this.props.note.index,
		topic: this.state.topic, 
	        content: this.state.content };
        
        if (this.props.user) {
            const id = this.props.user._id;
            const token = this.props.token;
            const url = 'http://localhost:5000/'+id+'/notes/update';

            fetch(url, {
                method: 'POST',
                headers: {
                   'Authorization': this.props.token,
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then( response => response.json() )
              .then( data => {
		  data.note.index = this.props.note.index;
		  this.props.editNote(data.note);
		  this.setState({toggle: false});
              })
        } else {
            this.props.editNote( data );
            this.setState({toggle: false});
        }
    }

    handleClick() {
        var val = !this.state.toggle;
        this.setState({ topic: this.props.note.topic,
                       content: this.props.note.content, 
		toggle: val });
    }


    render() { 
        return (
        <div>
            <h3>{this.props.note.topic}</h3>
            {ReactHtmlParser(this.props.note.content)}
            <button onClick={this.handleClick}>
		{ this.state.toggle ? 'Cancel' : 'Edit' }
            </button>
            <button onClick={this.handleRemove}>
		Delete
            </button>

	    { this.state.toggle ?
                <form onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='Topic' name='topic'
                        value={this.state.topic} onChange={this.handleChange}
                    />
                    <Editor name='content'
                        initialValue="<p>Your notes...</p>"
                        value = {this.state.content}
                        init={{
                            height: 250,
                            width: 500,
                            menubar: false,
                            plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                      'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                       }}
                       onEditorChange={this.handleEditorChange}
                    />
                    <input type='submit' value='Update'></input>
                </form>

                : ''
	    }
        </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    notes: state.notes,
  }
}

const mapDispatchToProps = { addNote, editNote, removeNote }
const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(NoteForm)
const ConnectedNoteList = connect(mapStateToProps, mapDispatchToProps)(NoteList)
const ConnectedNote = connect(mapStateToProps, mapDispatchToProps)(Note)

export default Notes;
