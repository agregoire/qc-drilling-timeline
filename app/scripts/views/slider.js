/*global QcDrillingTimeline, Backbone*/

QcDrillingTimeline.Views = QcDrillingTimeline.Views || {};

(function () {
  'use strict';

  QcDrillingTimeline.Views.Slider = Backbone.View.extend({
    initialize: function(options) {
      var self = this;
      this.model = options.clock;

      $('#slider')
        .slider({
          max: this.model.get('maxYear'),
          min: this.model.get('minYear'),
          slide: function(event, ui) {
            self.model.stop();
            self.model.set('year', ui.value);
            self.render();
          }
        })
        .slider('pips', {
          step: 5,
          rest: 'label'
        });
      this.listenTo(this.model, 'change', this.render);
    },
    render: function () {
      $('#slider').slider('value', this.model.get('year'));
    }
  });
})();
