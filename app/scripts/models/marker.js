/*global QcDrillingTimeline, Backbone, Store*/

QcDrillingTimeline.Models = QcDrillingTimeline.Models || {};

(function () {
  'use strict';

  QcDrillingTimeline.Models.Marker = Backbone.Model.extend({
    localStorage: new Store('qc-drilling-timeline'),
    visible: function() {
      var currentYear = QcDrillingTimeline.clock.model.get('year');
      if ((currentYear >= this.get('start')) && (currentYear <= this.get('end'))) {
        return true;
      } else {
        return false;
      }
    }
  });

})();
