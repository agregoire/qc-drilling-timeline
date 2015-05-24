/*global QcDrillingTimeline, Backbone, google*/

QcDrillingTimeline.Views = QcDrillingTimeline.Views || {};

(function () {
  'use strict';

  QcDrillingTimeline.Views.Marker = Backbone.View.extend({
    initialize: function () {
      this.marker = null;
      this.infoWindow = null;
      this.listenTo(this.model, 'change', this.render);
      this.map = QcDrillingTimeline.map.map;
    },

    render: function () {
      if (this.marker === null) {
        this.buildMarker();
      }

      if (this.model.visible()) {
        this.show();
      } else {
        this.hide();
      }

      return this;
    },
    activeIcon: function() {
      var icon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 1.0,
        fillColor: '#ff0000',
        strokeOpacity: 1.0,
        strokeColor: '#000000',
        strokeWeight: 1.0, 
        scale: 7 //pixels
      };
      return icon;
    },
    inactiveIcon: function() {
      var icon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 0.7,
        fillColor: '#aaaaaa',
        strokeOpacity: 0.7,
        strokeColor: '#555555',
        strokeWeight: 1.0, 
        scale: 5 //pixels
      };
      return icon;

    },
    buildMarker: function() {
      var self = this;

      // Build marker
      this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.model.get('latitude'), this.model.get('longitude')),
        map: this.map,
        icon: this.activeIcon()
      });

      // Build the info window's content
      var contentHeader = '<div class="info-window"><h1>' + this.model.get('name') + '</h1>' +
                          '<h2>Puits numéro ' + this.model.get('number') + '<br>' +
                          this.model.get('company') + '</h2>';
      var contentYear = "";

      if (this.model.get('start') === this.model.get('end')) {
        contentYear = '<p>Année de forage: ' + this.model.get('start') + '</p>';
      } else {
        contentYear = '<p>Année de début de forage: ' + this.model.get('start') + '</p>' + 
                      '<p>Année de fin de forage: ' + this.model.get('end') + '</p>';
      }
      var contentEnd = '</div>';

      // Hook up the info window
      this.infoWindow = new google.maps.InfoWindow({
        content: contentHeader + contentYear + contentEnd
      });

      google.maps.event.addListener(this.marker, 'click', function() {
        self.infoWindow.open(self.map, self.marker);
      });
    },
    hide: function() {
      this.marker.setMap(null);
    },
    show: function() {
      if (this.marker.getMap() === null) {
        this.marker.setMap(this.map);
      }

      if (this.model.active()) {
        if (this.marker.getIcon().fillColor !== this.activeIcon.fillColor) {
          this.marker.setIcon(this.activeIcon());
        }
      } else {
        if (this.marker.getIcon().fillColor !== this.inactiveIcon.fillColor) {
          this.marker.setIcon(this.inactiveIcon());
        }
      }
    }
  });

})();
