import React, {useState} from 'react';

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
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleClick = this.handleClick.bind(this);
	this.state = ({topic: '', content: '', toggle: false});
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
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
                    <textarea placeholder='Your note...' name='content'
                        value={this.state.content}
                        onChange={this.handleChange}></textarea>
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

export default Notes;
