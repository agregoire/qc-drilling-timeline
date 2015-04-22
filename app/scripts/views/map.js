/*global QcDrillingTimeline, Backbone, google*/

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