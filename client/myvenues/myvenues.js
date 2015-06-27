Template.myVenues.events({

	'click .delete': function (e) {
		e.preventDefault();
		
		if (confirm('Do you really want delete request "'+ this.searchrequest + "'?")) {
    	var Id = this._id;
    		tmsSearch.remove(Id);
    	Router.go('Search');
    }
	},
	'click .view': function (e) {
		e.preventDefault();
		Router.go('myVenues',{_id: this._id});
	},
	
	'click .csv': function (e) {
		e.preventDefault();
		Router.go('/csv/' + Router.current().params._id);
	},

});

  Template.myVenues.rendered = function () {
   	
var temp = tmsSearch.findOne({_id: Router.current().params._id});
	
	googleMap.initialize(temp);
	
	googleMap.showMarkers(temp.venues);
  }

Template.myVenues.helpers({
	serched: function () {
		return tmsSearch.find({},{sort: {searched: 1}}).fetch();
	}
});
