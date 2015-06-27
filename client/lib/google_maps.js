googleMap = {
	radius: 800,
    square: 0,
    zoom: 15,
    ne: '',
    sw: '',
    venuesResult: [], 
    markers: [],
    whereIam: [], 
    lat: 0,
    lng:0,
	
    initialize: function (data) {
	    var mapOptions = {mapTypeId: google.maps.MapTypeId.ROADMAP};
        if (data) {
            mapOptions.center = new google.maps.LatLng(data.lat, data.lng);
            mapOptions.zoom = data.zoom;
            mapOptions.scaleControl = true;
            mapOptions.draggable = false;
            mapOptions.scrollwheel= false;
            mapOptions.navigationControl= false;
            mapOptions.mapTypeControl= false;
            mapOptions.disableDefaultUI = true;


    
        }else{
        mapOptions = {
		    center: new google.maps.LatLng(49.553063, 25.594789),
	        zoom: this.zoom,
            scaleControl: true,
	        };
        }
	    this.map = new google.maps.Map(document.getElementById("map_canvas"),
	        mapOptions);
        //googleMap.ne = bunds.getNorthEast().lat()//+','+bunds.getNorthEast().lng();
        //googleMap.sw = bunds.getSouthWest().lat()//+','+bunds.getSouthWest().lng();
        this.showWhereIam();
	    this.lat = this.map.getCenter().lat();
    	this.lng = this.map.getCenter().lng();
	       
        google.maps.event.addListener(mymap = this.map, 'center_changed', function() {
        	googleMap.lat = mymap.getCenter().lat();
        	googleMap.lng = mymap.getCenter().lng();
            googleMap.showWhereIam();
            googleMap.getMapBounds();
        	return;
      	});
        
        google.maps.event.addListener(mymap = this.map, 'zoom_changed', function() {
         	zoom = mymap.getZoom();
            googleMap.zoom = zoom;
         	if (zoom >= 15) {
         		googleMap.radius = 800;
         	} else if (zoom <= 7) {
         		googleMap.radius = 99999.99;
         	} else {
         		switch(zoom) {
         			case 14: googleMap.radius = 1228;
         				break;
         			case 13: googleMap.radius = 2470;
         				break;
         			case 12: googleMap.radius = 4874;
         				break;
         			case 11: googleMap.radius = 9932;
         				break;
         			case 10: googleMap.radius = 19680;
         				break;
         			case 9: googleMap.radius = 39468;
         				break;
         			case 8: googleMap.radius = 78741;
         				break;
         			}
         	}
            googleMap.showWhereIam();
            googleMap.getMapBounds();
            return;
        });
	},
	showWhereIam:function () { // чоловічок в центрі мапи
        if (this.whereIam[0]){
            this.whereIam[0].setMap(null);
        this.whereIam[0] = [];
        }
        this.whereIam[0] = new google.maps.Marker({
                 position: this.map.getCenter(),
                 map: this.map,
                 zIndex: google.maps.Marker.MAX_ZINDEX + 1,
                 icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/man.png',
                 title: 'You are there!',
                 });
    },
    showMarkers: function (venues) { // показуємо маркери
    	if (this.markers) {
            this.deleteMarkers();
        }
        for (var i = 0; i < venues.length; i++) {
            var myMarker = venues[i];
            var myLatLng = new google.maps.LatLng(myMarker.location.lat, myMarker.location.lng);
            this.markers[i] = new google.maps.Marker({
                 position: myLatLng,
                 map: this.map,
                 title: myMarker.name,
                 });
        }
	},
    deleteMarkers: function () { // забираємо маркери
        if (this.markers){
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
        this.markers = [];
        }
    },
    getMapBounds: function () { // площа, і кординати для 4SQ when howsearch === 'square'
        var bounds = this.map.getBounds();
         googleMap.ne = bounds.getNorthEast().lat()+','+bounds.getNorthEast().lng();
         googleMap.sw = bounds.getSouthWest().lat()+','+bounds.getSouthWest().lng();
         var A = bounds.getSouthWest();
         var C = bounds.getNorthEast()
         var B = new google.maps.LatLng(C.lat(), A.lng());
         var AB = google.maps.geometry.spherical.computeDistanceBetween(A,B);
         var BC = google.maps.geometry.spherical.computeDistanceBetween(B,C);
         if (this.zoom <= 19 ) {
         this.square = ((AB * BC)/1000000).toFixed(2);
         } else {
         this.square = ((AB * BC)/1000000).toFixed(3);
         }
    },
};