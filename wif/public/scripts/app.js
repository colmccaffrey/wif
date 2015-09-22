//*************example chart**************
var Main = React.createClass({
	render: function() {
		return (
			<div className = "main">
			<Header/>
			<About />
			</div>
			);
	}
});
//*****************nav bar*****************
var About = React.createClass({
	render: function(){
		return (
			<div className = "about">
			<p> Women live multidimensional lives, films should represent that. </p>
				<h4>Don't just wife her.</h4>
			<p>The Bechdel test asks whether a work of fiction features at least two women who talk to each other about something other than a man. Only about half of all films meet these requirements, according to user-edited databases and the media industry press. The test is used as an indicator for the active presence of women in films and other fiction.</p>
			<p>The Bechdel test (/ˈbɛkdəl/ bek-dəl), also known as the Bechdel-Wallace test, is named for the American cartoonist Alison Bechdel, in whose comic strip Dykes to Watch Out For it first appeared in 1985. Bechdel credited the idea to a friend, Liz Wallace, and to the writings of Virginia Woolf. </p>
			<a href="http://bechdeltest.com/api/v1/doc" target="_blank">API Credit</a>
			</div>
			
			);
	}
});
var Header = React.createClass({
	render: function(){
		return(
			<div className="logo">
			<h1>Wifr</h1>
			<h3><em>representations of women in film</em></h3>
			</div>

			)
	}
})

//*********call to action sign up**********
var SignupForm = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var signature = React.findDOMNode(this.refs.signature).value.trim();
		var email = React.findDOMNode(this.refs.email).value.trim();
		var location = React.findDOMNode(this.refs.location).value.trim();
		if(!signature || !email || !location) {
			return;
		}
		this.props.onSignatureSubmit({signature: signature, email: email, location: location});
		React.findDOMNode(this.refs.signature).value = '';
		React.findDOMNode(this.refs.email).value = '';
		React.findDOMNode(this.refs.location).value = '';
		return;
	},
	render: function(){
		return(
			<form className = "signupForm" onSubmit={this.handleSubmit}>
			<input type = "text" placeholder="Your Name" ref="signature"/>
			<input type = "text" placeholder = "Your email" ref="email" />
			<input type = "text" placeholder = "City/State" ref="location" />
			<input type="submit" value="Post" name="Sign"/>
			</form>
			);
	}
});

var Signature = React.createClass({
	render: function(){
		var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return(
			<div className = "signature">
			<h3 className = "signatureName">
			 <em>{this.props.signature}</em>
			</h3>
			<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
			</div>
			);
	}
});

var CallToAction = React.createClass({
	loadSignatures: function(){
		$.ajax({
			url: this.props.url, 
			datatype: 'json',
			cache: false,
			success: function(data){
				this.setState({data: data});
			}.bind(this),
			error: function (xhr, status, err){
				console.log(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	handleSignatureSubmit: function(signature){
		var signatures = this.state.data;
		var newSignatures = signatures.concat([signature]);
		this.setState({data: newSignatures});
		$.ajax({
			url: this.props.url,
			datatype: 'json',
			type: 'POST',
			data: signature,
			success: function(data){
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	getInitialState: function() {
		return {data: []};
	},

	componentDidMount: function() {
		this.loadSignatures();
		setInterval(this.loadSignatures, this.props.pollInterval);
	},

	render: function(){
		return(
			<div className = "callToAction">
			<h4>We all benefit from the exploration of a greater range of human experience.</h4>
			<h3>Demand more diversity in film and media.</h3>
			<SignupForm onSignatureSubmit = {this.handleSignatureSubmit} />

			<SignatureList data = {this.state.data}/>
			</div>
			);
	}
});

var SignatureList = React.createClass({
	render: function() {
		var signatureNodes = this.props.data.map(function(signature){
			return (
				<Signature signature = {signature.signature}>
				{signature.location}
				</Signature>
				);
		});
		return (
			<div className = "signatureList">
			{signatureNodes}
			</div>
			);
	}
});


React.render(
	<Main/>,

	document.getElementById('container')
	);

React.render(
	<CallToAction url="signatures.json" pollInterval={2000} />,
	document.getElementById('call-to-action')

	);

