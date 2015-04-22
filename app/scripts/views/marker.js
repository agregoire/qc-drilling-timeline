/*global QcDrillingTimeline, Backbone, JST*/

QcDrillingTimeline.Views = QcDrillingTimeline.Views || {};

(function () {
  'use strict';

  QcDrillingTimeline.Views.Marker = Backbone.View.extend({
    initialize: function () {
      this.marker = null;
      this.listenTo(this.model, 'change', this.render);
      this.map = QcDrillingTimeline.map.map;
    },

    render: function () {
      if (this.marker == null) {
        this.marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.model.get("latitude"), this.model.get("longitude")),
          map: this.map
        })
      };

      if (this.model.visible()) {
        this.show();
      } else {
        this.hide();
      };

      return this;
    },
    hide: function() {
      this.marker.setMap(null);
    },
    show: function() {
      if (this.marker.getMap() == null) {
        this.marker.setMap(this.map);
      }
    }
  });

})();
