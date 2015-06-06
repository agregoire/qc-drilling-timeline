/*global QcDrillingTimeline, Backbone*/

QcDrillingTimeline.Collections = QcDrillingTimeline.Collections || {};

(function () {
  'use strict';

  QcDrillingTimeline.Collections.Markers = Backbone.Collection.extend({
    model: QcDrillingTimeline.Models.Marker,
    url: 'drillings.json'
  });

})();
