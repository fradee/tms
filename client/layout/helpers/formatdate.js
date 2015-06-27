Template.registerHelper('formatDate',function (argument) {
	return moment(argument).format('MMM D HH:mm');});