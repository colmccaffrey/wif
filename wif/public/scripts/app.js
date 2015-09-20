
var MainChart = React.createClass({
	render: function() {
		return (
			<div className = "mainChart">
			<Nav />
			Hello WOrld
			</div>
			);
	}
});

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



React.render(
	<MainChart/>,
	document.getElementById('container')
	);

