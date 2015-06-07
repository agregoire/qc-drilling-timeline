/*global QcDrillingTimeline, Backbone*/

QcDrillingTimeline.Views = QcDrillingTimeline.Views || {};

(function () {
  'use strict';

  QcDrillingTimeline.Views.Slider = Backbone.View.extend({
    initialize: function(options) {
      var self = this;
      this.model = options.clock;
      this.maxYear = this.model.get('maxYear');
      this.minYear = this.model.get('minYear');

      $('#slider')
        .slider({
          max: this.maxYear,
          min: this.minYear,
          slide: function(event, ui) {
            self.model.stop();
            self.model.set('year', ui.value);
            self.render();
          }
        });
      this.adaptSlider();

      this.listenTo(this.model, 'change', this.render);

      $(window).resize(function() {
        self.adaptSlider();
      });
    },
    render: function() {
      $('#slider').slider('value', this.model.get('year'));
    },
    adaptSlider: function() {
      var width = $(window).width();
      var step = 0;

      if (width > 1200) {
        step = (this.maxYear - this.minYear) / 15;
      } else {
        step = (this.maxYear - this.minYear) / 5;
      }

      $('#slider').slider('pips', {
        step: step,
        rest: 'label'
      });
    }
  });
})();
