function placeMarkers(drillings) {
  for (var i = drillings.data.length - 1; i >= 0; i--) {
    new google.maps.Marker({
      position: new google.maps.LatLng(drillings.data[i].latitude,drillings.data[i].longitude),
      map: map,
      title:"Drilling !"
    });
  };
}

function initialize() {
  var mapOptions = {
    center: { lat: 47.8083333, lng: -69.6280556},
    zoom: 6
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  Papa.parse("/drillings.csv", {
    download: true,
    header: true,
    complete: function(results) {
      placeMarkers(results);
    }
  });

}

google.maps.event.addDomListener(window, 'load', initialize);