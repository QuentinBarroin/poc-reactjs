// tutorial9.js
var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];
var Comment = React.createClass({

	rawMarkup: function(){
		var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return { __html : rawMarkup };
	},

	render: function() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}
});

var CommentBox = React.createClass({
	render: function() {
		return (
			<div className="CommentBox">
				<h1>Comments</h1>
				<CommentList data={this.props.data}/>
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
	<CommentBox data={data} />,
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