Template.Search.events({
	'submit form': function (e) {
		e.preventDefault();
		var searchreq = $(e.target).find('[name=searchRequest]').val();

		if (searchreq) {
					googleMap.getMapBounds();
				var dz = mySettings.findOne({id_user: Meteor.user()._id});

				if (!dz) {
					Meteor.call('settingsFirstLogin',function (error,result) {
							  if (error)
							  	console.log(error);
							  });
				};

				dz = mySettings.findOne({id_user: Meteor.user()._id});
				
				var paramFor4SQ = {
					searchreq: searchreq,
					howsearch: dz.howsearch,
					lat: googleMap.lat,
					lng: googleMap.lng,
					radius: googleMap.radius,
					sw: googleMap.sw,	
					ne: googleMap.ne
				};
			Meteor.promise('FourSQsearch', paramFor4SQ)
					.then(function (resultVenues) {
						googleMap.venuesResult = resultVenues;
						return;
					})
				.then(function () {
				if (googleMap.venuesResult.length) {
						var paramForInsert = {
							searchreq: searchreq,
							lat: googleMap.lat,
							lng: googleMap.lng,
							radius: googleMap.radius,
							square: googleMap.square,
							zoom: googleMap.zoom,
							venuesResult: googleMap.venuesResult,
						};

				Meteor.call('insertUserSearch',paramForInsert,function (error,result) {
							  if (error)
							  // console.error(error);
							  	setError(error.reason,'danger');
							  if (result){
								Router.go('myVenues', {_id: result});	
							  };
							  });
			}else{
					setError('Nothing found.','warning');
			};})
				 .catch(function (err) {
  console.error(err);
});

			} else {
				Router.go('Search');
			}
	},

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
	}	
});
Template.Search.rendered = function () {
 	googleMap.initialize();
 }
