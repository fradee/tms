mySettings = new Mongo.Collection('tms_settings');

mySettings.allow({
 	insert: function (userId, doc) {
 	return !!userId;
 },
	update: function (userId, doc) {
	return userId && doc.id_user === userId;
},
});
mySettings.deny({
	remove: function (userId, doc) {
	return doc && doc.userId === userId;
},
});


Meteor.methods({
	settingsFirstLogin: function () {
		var dz = {
			id_user: Meteor.user()._id,
			howsearch: "square",
		};
		mySettings.insert(dz);
		
	},
	settingsUpdate: function (someData) {
		var settinsWithProp = mySettings.findOne({id_user: Meteor.user()._id});
		if (settinsWithProp) {
			mySettings.update({id_user: Meteor.user()._id}, {$set: someData}, function(error) {
			    if (error) {
			    	alert(error.reason);
			    }
	    	});
	    	
		} else {
			Meteor.call('settingsFirstLogin',function (error) {
				if (error) {
			    	alert(error.reason);
			    }
			});
		} 
	}
});


