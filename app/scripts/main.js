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
  console.log("tic");
  this.timeout = setTimeout(function() {
    var year = parseInt($("#year").val());
    var newYear = year + 1;
    $("#year").val(newYear);
    placeMarkers(window.drillings.getDataForYear(newYear));
    context.start()
  }, 500)
}

Clock.prototype.stop = function() {
  clearTimeout(this.timeout);
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
    placeMarkers(window.drillings.getDataForYear(1860))
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
