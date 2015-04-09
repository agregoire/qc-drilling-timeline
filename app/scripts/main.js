var Drillings = function(callback) {
  var context = this;

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

var Clock = function() {
  this.year = 1860;
  this.maxYear = 2012;
  this.minYear = 2012;
  this.timeout = null;
  $("#year").val(this.year);
}

Clock.prototype.start = function() {
  var context = this;
  this.timeout = setTimeout(function() {
    var year = parseInt($("#year").val());
    var newYear = year + 1;
    $("#year").val(newYear);
    window.map.placeMarkers(window.drillings.getDataForYear(newYear));
    context.start()
  }, 500)
}

Clock.prototype.stop = function() {
  clearTimeout(this.timeout);
}

var Map = function() {
  var mapOptions = {
    center: { lat: 47.8083333, lng: -69.6280556},
    zoom: 6
  };

  this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  this.markers = new Array;
}

Map.prototype.placeMarkers = function(data) {
  for (var i = 0; i < this.markers.length; i++) {
    this.markers[i].setMap(null);
  }

  for (var i = data.length - 1; i >= 0; i--) {
    this.markers.push(new google.maps.Marker({
      position: new google.maps.LatLng(data[i].latitude,data[i].longitude),
      map: window.map.map,
      title:"Drilling !"
    }));
  };
}

function initialize() {
  window.map = new Map;
  window.drillings = new Drillings(function() {
    window.map.placeMarkers(window.drillings.getDataForYear(1860))
  });

  window.clock = new Clock;
  $("#play").on("click", function() {
    window.clock.start();
  })
  $("#stop").on("click", function() {
    window.clock.stop();
  })
}

google.maps.event.addDomListener(window, 'load', initialize);
