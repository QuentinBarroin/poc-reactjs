// tutorial2.js
var CommentList = React.createClass({
	render: function() {
		return (
			<div className="commentList">
				Hello World ! I am a CommentList.
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
  <CommentList />,
  document.getElementById('commentList')
);

ReactDOM.render(
  <CommentForm />,
  document.getElementById('commentForm')
);