/*global QcDrillingTimeline, Backbone, JST*/

QcDrillingTimeline.Views = QcDrillingTimeline.Views || {};

(function () {
  'use strict';

  QcDrillingTimeline.Views.Map = Backbone.View.extend({
    id: 'map-canvas',
    initialize: function () {
      var mapOptions = {
        center: { lat: 47.8083333, lng: -69.6280556},
        zoom: 6
      };
      this.map = new google.maps.Map(document.getElementById(this.id), mapOptions);
    },
    render: function () {
      return this;
    }
  });

})();



// var Map = function() {
//   var mapOptions = {
//     center: { lat: 47.8083333, lng: -69.6280556},
//     zoom: 6
//   };

//   this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//   this.markers = new Array;
// }

// Map.prototype.placeMarkers = function(data) {
//   for (var i = 0; i < this.markers.length; i++) {
//     this.markers[i].setMap(null);
//   }

//   for (var i = data.length - 1; i >= 0; i--) {
//     this.markers.push(new google.maps.Marker({
//       position: new google.maps.LatLng(data[i].latitude,data[i].longitude),
//       map: this.map,
//       title:"Drilling !"
//     }));
//   };
// }