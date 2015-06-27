Template.Settings.helpers({
	howsearch: function () {
		var dz = mySettings.findOne({id_user: Meteor.user()._id})
		if (dz)
			return dz.howsearch;
		else
			return 'square';	

	},
});

Template.Settings.events({
	'submit form': function (e) {
		e.preventDefault();

		var howsearch = $(e.target).find('[name=howsearch]:checked').val();
		var properies = {
			howsearch: howsearch,
		};
		
		Meteor.call('settingsUpdate',properies, function (error, result) {
			if (error) {
				return setError(error.reason,'danger');
			}
			else {
				return setError('Your settings updated saccessful!','info');
			}

		});
	}});

