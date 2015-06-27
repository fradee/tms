Template.registerHelper('equals', function (a, b) {
      return a === b;
    });
Template.registerHelper('notequals', function (a, b) {
      return a != b;
    });

Template.registerHelper('activate_row',function(a){
return Router.current().params._id === a;
});