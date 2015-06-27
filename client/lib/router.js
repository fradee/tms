Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	// waitOn: function () { 
			 
	// 		 return;
	// }
});


Router.route('/settings',{name: 'Settings'});

Router.route('/',function () {
	
	this.next();
	this.render('Search',{
		data:{
			serched: function () {
			return tmsSearch.find({},{sort: {searched: 1}}).fetch();
			}
		}
	});
},{name: 'Search'});

Router.route('/myvenues/:_id',function () {
	
	var temp = tmsSearch.findOne({_id: this.params._id}); 
	this.render('myVenues',{
	 data: {
		 		id: this.params._id,
		 		serched: function () {
		 		return tmsSearch.find({},{sort: {searched: 1}}).fetch();
		 		},
				countVenues: temp.venues.length,
				venues: temp.venues,
	}});

	googleMap.initialize(temp);
	googleMap.showMarkers(temp.venues);
	
}, {name: "myVenues"});

var requireLogin = function () {
	var userId = Meteor.isClient ? Meteor.user() : this.userId;
	
	if (Meteor.isClient){
	if (!userId) {
		if (Meteor.loggingIn()) {
			this.render('loading');
		
		} else {
			this.render('accessDenied');
		}}
	 else{
			this.next();
			
	}};


};

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin);
Router.before(function () {
	clearError();
	this.next();
})