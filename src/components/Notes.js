import React, {useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import { connect } from "react-redux";

const Notes = () => {
    return (
    <div>
        <h1>Notes</h1>
	<NoteForm />
	<NoteList />
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
         console.log('Content was updated:', content);
    }

    handleSubmit(e) {
	e.preventDefault();
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
    render() {
        return <h2>Your notes!</h2>
    }
}

const mapStateToProps = state => ({
  notes: state.mainContainerData
});

export default connect(Notes);
