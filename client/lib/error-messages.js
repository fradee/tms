tmsErrors = new Meteor.Collection(null);

setError = function (message,type) {
	tmsErrors.insert({message: message, type: type, seen: false});
}

clearError = function () {
	tmsErrors.remove({seen: true});
}
