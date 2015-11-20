// tutorial11.js
var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];
var Comment = React.createClass({

	rawMarkup: function(){
		var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return { __html : rawMarkup };
	},

	handleClick: function(e){
		
		e.preventDefault();
		var key = parseInt($(e.target).closest('.comment').index());
		this.props.onCommentDelete({key : key});

		/*
		var id = parseInt($(e.target).data('reactid').split('.')[3].replace('$', ''));
		var author = this.props.author.trim();
		var text = this.props.children.trim();
		if (!text || !author || !id) {
	      return;
	    }
	    
		this.props.onCommentDelete({author: author, id: id, text: text});
		
		return;
		*/
		
	},

	render: function() {
		return (
			<div className="comment">
				<h2 className="commentAuthor" ref="author">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()}  ref="text" />
				<a href="#" title="" onClick={this.handleClick}>Supprimer le commentaire</a>
			</div>
		);
	}
});

var CommentBox = React.createClass({
	getInitialState: function() {
	    return {data: []};
	},
	loadCommentsFromServer: function() {
	    $.ajax({
	      	url: this.props.url,
	      	dataType: 'json',
	      	cache: false,
	      	success: function(data) {
	        	this.setState({data: data});
	        	// console.log(this.state)
	      	}.bind(this),
	      	error: function(xhr, status, err) {
	        	console.error(this.props.url, status, err.toString());
	      	}.bind(this)
    	});

	},
	handleCommentSubmit: function(comment) {
		var comments = this.state.data;
	    // Optimistically set an id on the new comment. It will be replaced by an
	    // id generated by the server. In a production application you would likely
	    // not use Date.now() for this and would have a more robust system in place.
	    comment.id = Date.now();
	    var newComments = comments.concat([comment]);
	    this.setState({data: newComments});

	    // console.log(JSON.stringify(comment));
	    // console.log(JSON.stringify(comments));
	    // console.log(JSON.stringify(newComments));

	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      type: 'POST',
	      data: comment,
	      success: function(data) {
	        this.setState({data: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	},
    componentDidMount: function() {
	    this.loadCommentsFromServer();
	    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	render: function() {
		return (
			<div className="CommentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data} url="/api/deletecomment"/>
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		);
	}
});

var CommentList = React.createClass({
	handleCommentDelete: function(index){

		console.log(index);

		/*		
		var newComments = [];
		var commentToRemove;

		this.props.data.map(function(commentaire){
			// console.log("commentaire : ", commentaire);
			if (commentaire.author != comment.author){
				commentToRemove = commentaire;
				newComments.push(commentaire);
			}
		});
		console.log(newComments);

		// console.log(this.props.url);

	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      type: 'POST',
	      data: commentToRemove,
	      success: function(data) {
	      	console.log("data : ",data);
	        this.setState({data: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
		*/

	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      type: 'POST',
	      data: index,
	      success: function(data) {
	      	console.log(data);
	        // this.setState({data: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });

	},
	render: function() {
		var that = this;
		var commentNodes = this.props.data.map(function(comment){
			return (
				<Comment author={comment.author} key={comment.id} onCommentDelete={that.handleCommentDelete}>
					{comment.text}
				</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

var CommentForm = React.createClass({
 	handleSubmit: function(e) {
	    e.preventDefault();
	    var author = this.refs.author.value.trim();
	    var text = this.refs.text.value.trim();
	    if (!text || !author) {
	      return;
	    }
	    this.props.onCommentSubmit({author: author, text: text});
	    this.refs.author.value = '';
	    this.refs.text.value = '';
	    return;
  	},
	render: function() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
		        <input type="text" placeholder="Your name" ref="author" />
		        <input type="text" placeholder="Say something..."  ref="text" />
		        <input type="submit" value="Post" />
	      	</form>
		);
	}
});



ReactDOM.render(
	<CommentBox url="/api/comments" pollInterval={2000} />,
	document.getElementById('content')	
);


$.inObject = function(value, obj) {
	var bool = false;

	$.each(obj, function(key, val) {
		if (typeof val === 'object') {
			$.inObject(value, val);
		}

		if (value === key) {
			bool = true;
			return;
		}
	});
	return bool;
};