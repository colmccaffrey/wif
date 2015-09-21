//*************example chart**************
var Main = React.createClass({
	render: function() {
		return (
			<div className = "main">
			<Nav/>
			</div>
			);
	}
});
//*****************nav bar*****************
var Nav = React.createClass({
	render: function(){
		return (
			<div className = "nav">
			<button class= "navItem">Home</button>
			<button class= "navItem">About</button>
			</div>
			);
	}
});


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
			<input type="submit" value="Post" />
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
			<SignupForm onSignatureSubmit = {this.handleSignatureSubmit} />
			<h2>Sign Petition </h2>
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

