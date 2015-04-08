var Drillings = function(callback) {
  context = this;

  Papa.parse("/drillings.csv", {
    download: true,
    header: true,
    complete: function(results) {
      context.data = results;
      callback();
    }
  });
}

Drillings.prototype.getData = function() {
  return this.data.data;
}

Drillings.prototype.getDataForYear = function(year) {
  var filteredData = new Array;
  for (var i = this.data.data.length - 1; i >= 0; i--) {
    if ((year >= this.data.data[i].start) && (year <= this.data.data[i].end)) {
      filteredData.push(this.data.data[i]);
    }
  }

  return filteredData;
}

function placeMarkers(drillings) {
  for (var i = 0; i < window.markers.length; i++) {
    window.markers[i].setMap(null);
  }

  for (var i = drillings.length - 1; i >= 0; i--) {
    window.markers.push(new google.maps.Marker({
      position: new google.maps.LatLng(drillings[i].latitude,drillings[i].longitude),
      map: window.map,
      title:"Drilling !"
    }));
  };
}

function initialize() {
  var mapOptions = {
    center: { lat: 47.8083333, lng: -69.6280556},
    zoom: 6
  };
  window.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  window.markers = new Array;
  window.drillings = new Drillings(function() {
    placeMarkers(window.drillings.getData())
  });

  $("#year").on("change", function() {
    placeMarkers(window.drillings.getDataForYear(this.value))
  })
}

google.maps.event.addDomListener(window, 'load', initialize);
