/*global QcDrillingTimeline, Backbone, JST*/

QcDrillingTimeline.Views = QcDrillingTimeline.Views || {};

(function () {
  'use strict';

  QcDrillingTimeline.Views.Markers = Backbone.View.extend({
    initialize: function(options) {
      var self = this;
      this.markerViews = new Array;
      
      this.clock = clock;
      this.listenTo(options.clock, 'change', this.render);
      
      this.collection = new QcDrillingTimeline.Collections.Markers;

      this.collection.fetch({
        success: function() { self.render() }
      });
    },
    render: function() {
      var self = this;
      if (this.markerViews.length == 0) {
        this.collection.each(function(marker){
          var markerView = new QcDrillingTimeline.Views.Marker({model: marker});
          self.markerViews.push(markerView);
          markerView.render();
        })
      } else {
        for (var i = this.markerViews.length - 1; i >= 0; i--) {
          this.markerViews[i].render();
        };
      }
    }
  });
})();
