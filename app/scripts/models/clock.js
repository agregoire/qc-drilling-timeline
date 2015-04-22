/*global QcDrillingTimeline, Backbone*/

QcDrillingTimeline.Models = QcDrillingTimeline.Models || {};

(function () {
  'use strict';

  QcDrillingTimeline.Models.Clock = Backbone.Model.extend({
    defaults: {
      "year": 1860,
      "maxYear": 2012,
      "minYear": 1860,
      "timeout": null
    },
    start: function() {
      var self = this;
      this.timeout = setTimeout(function() {
        self.set("year", self.get("year") + 1);
        self.start()
      }, 500)
    },
    stop: function() {
      clearTimeout(this.timeout);
    }

  });

})();
