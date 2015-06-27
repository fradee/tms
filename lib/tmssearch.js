tmsSearch = new Mongo.Collection('tms_search');

tmsSearch.allow({
	remove: function (userId, doc) {
	return userId && doc.id_user === userId;
},
});
 tmsSearch.deny({
 	update: function (userId, doc) {
 		return;
 	}
 });

Meteor.methods({

	insertUserSearch: function (data) {
		
		var dz = mySettings.findOne({id_user: Meteor.user()._id})
		data.radius = dz.howsearch === 'radius' ? data.radius : 0;
		data.square = dz.howsearch  === 'square' ? data.square : 0;

		var paramsTmsSearch = {
			id_user: Meteor.user()._id,
			lat: data.lat,
			lng: data.lng,
			searched: new Date(),
			searchrequest: data.searchreq,
			radius: data.radius,
			square:	data.square,
			zoom: data.zoom,
			venues: data.venuesResult,
		};
		var IdTmsSearch = tmsSearch.insert(paramsTmsSearch);
		return IdTmsSearch;
	}
});