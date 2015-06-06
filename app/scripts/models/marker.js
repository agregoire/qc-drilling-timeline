/*global QcDrillingTimeline, Backbone, Store*/

QcDrillingTimeline.Models = QcDrillingTimeline.Models || {};

(function () {
  'use strict';

  QcDrillingTimeline.Models.Marker = Backbone.Model.extend({
    localStorage: new Store('qc-drilling-timeline'),
    defaults: {
      number: "",
      name: "",
      region: "",
      latitude: 0.0,
      longitude: 0.0,
      company: "",
      start: "",
      end: "",
    },
    visible: function() {
      var currentYear = QcDrillingTimeline.clock.model.get('year');
      if (currentYear >= this.get('start')) {
        return true;
      } else {
        return false;
      }
    },
    active: function() {
      var currentYear = QcDrillingTimeline.clock.model.get('year');
      if ((currentYear >= this.get('start')) && (currentYear <= this.get('end'))) {
        return true;
      } else {
        return false;
      }
    }
  });

})();
