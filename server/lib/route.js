Router.route('/csv/:_id', {
  where: 'server',
  action: function () {
    var filename = 'myVenues.csv';
    var fileData = "Name\tCity\tStreet Address\tLatitude\tLongitude\t" + "\r\n";

    var headers = {
      'Content-type': 'text/csv',
      'Content-Disposition': "attachment; filename=" + filename
    };
    var records = tmsSearch.findOne({_id: this.params._id});
     for (var i = records.venues.length - 1; i >= 0; i--) {
     	
      fileData += records.venues[i].name + "\t" + records.venues[i].location.city + "\t" + records.venues[i].location.address + "\t" + records.venues[i].location.lat + "\t" + records.venues[i].location.lng + "\t" + "\r\n";
     }; 
  this.response.statusCode = 200;
  this.response.writeHead(200, headers);
  this.response.end(fileData);
  Router.go('myVenues',{_id: this.params._id});
  },
  name: "csv"
});