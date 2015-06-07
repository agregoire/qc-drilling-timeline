/*global QcDrillingTimeline, Backbone*/

QcDrillingTimeline.Models = QcDrillingTimeline.Models || {};

(function () {
  'use strict';

  QcDrillingTimeline.Models.Clock = Backbone.Model.extend({
    defaults: {
      'year': 1860,
      'maxYear': 2013,
      'minYear': 1860,
      'timeout': null,
      'running': false
    },
    start: function() {
      var self = this;
      this.set('running', true);

      if (this.get('year') < this.get('maxYear')) {
        this.timeout = setTimeout(function() {
          self.set('year', self.get('year') + 1);
          self.start();
        }, 500);
      } else {
        this.set('running', false);
      }
    },
    stop: function() {
      this.set('running', false);
      clearTimeout(this.timeout);
    }

  });

})();
