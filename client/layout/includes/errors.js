Template.errors.helpers({
	errors: function () {
		return tmsErrors.find();
	}
});

Template.error.rendered = function () {
	var error = this.data;
	console.log(error);
	if (error._id) {
	Meteor.defer(function () {
		tmsErrors.update(error._id,{$set: {seen: true}});
	});};
};