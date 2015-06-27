Meteor.publish('tms_settings', function () {
	return mySettings.find({id_user: this.userId});
});

Meteor.publish('tms_search', function () {
	return tmsSearch.find({id_user: this.userId});
});