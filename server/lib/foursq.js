Meteor.methods({
	FourSQsearch: function (searchRequest) {
			if (searchRequest.howsearch === 'square') {
			
			var initParams={
				params :{
				sw: searchRequest.sw,
				ne: searchRequest.ne,
				query: searchRequest.searchreq,
				limit: 50,
				intent: 'browse',
				v: '20150601',
				m:'foursquare',
				client_id: Meteor.settings.foursq.clientId,
				client_secret: Meteor.settings.foursq.clientSecret,
			}};	
			} else if (searchRequest.howsearch === 'radius'){
				
			var initParams={
				params :{
				ll: searchRequest.lat + ',' + searchRequest.lng,
				radius: searchRequest.radius,
				query: searchRequest.searchreq,
				limit: 50,
				intent: 'browse',
				v: '20150601',
				m:'foursquare',
				client_id: Meteor.settings.foursq.clientId,
				client_secret: Meteor.settings.foursq.clientSecret,
			}};
			}
			var tempMy = HTTP.get('https://api.foursquare.com/v2/venues/search',initParams);
			return tempMy.data.response.venues
			},
}); 