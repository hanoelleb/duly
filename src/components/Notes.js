import React, {useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import { connect } from 'react-redux';

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
	
	//TODO: if logged in also save to database with api
	//otherwise just add to list
	console.log(this.props.user);

        const data = { topic: this.state.topic, content: this.state.content };

	if (this.props.user) {
	    const id = this.props.user._id;
            console.log('ID: ' + id);
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
		  //TODO add note to note list with dispatch
	      })
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
                    console.log(notes);
                    //TODO call dispatch and add all of these notes
                    //notes.forEach
		});
	}
    }

    render() {
        return <h2>Your notes!</h2>
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    notes: state.notes,
  }
}

//const mapDispatchToProps = {  toggleImportanceOf,}
const ConnectedForm = connect(mapStateToProps)(NoteForm)
const ConnectedNoteList = connect(mapStateToProps)(NoteList)

export default Notes;
