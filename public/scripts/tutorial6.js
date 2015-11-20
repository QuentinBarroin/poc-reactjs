// tutorial6.js
var Comment = React.createClass({
	render: function() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				{marked(this.props.children.toString())}
			</div>
		);
	}
});

var CommentBox = React.createClass({
	render: function() {
		return (
			<div className="CommentBox">
				<h1>Comments</h1>
				<CommentList />
				<CommentForm />
			</div>
		);
	}
});

var CommentList = React.createClass({
	render: function() {
		return (
			<div className="commentList">
				<Comment author="Jean Claude">This is one comment</Comment>
				<Comment author="Jon Snow">This is *another* comment</Comment>
			</div>
		);
	}
});

var CommentForm = React.createClass({
	render: function() {
		return (
			<div className="commentForm">
				Hello World ! I am a CommentForm.
			</div>
		);
	}
});



ReactDOM.render(
	<CommentBox />,
	document.getElementById('content')	
);

// ReactDOM.render(
//   <CommentList />,
//   document.getElementById('commentList')
// );

// ReactDOM.render(
//   <CommentForm />,
//   document.getElementById('commentForm')
// );