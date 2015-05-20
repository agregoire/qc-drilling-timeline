/*global QcDrillingTimeline, Backbone*/

QcDrillingTimeline.Views = QcDrillingTimeline.Views || {};

(function () {
  'use strict';

  QcDrillingTimeline.Views.Clock = Backbone.View.extend({
    template: JST['app/scripts/templates/clock.ejs'],
    initialize: function () {
      this.model = new QcDrillingTimeline.Models.Clock();
      this.listenTo(this.model, 'change', this.render);
      $("#slider").slider({
        max: this.model.get('maxYear'),
        min: this.model.get('minYear')
      });
      this.render();
    },
    events: {
      'click #play': 'toggleClock',
      'change #year': 'changeYear'
    },
    toggleClock: function() {
      if (this.model.get("running") === true) {
        this.model.stop();
      } else {
        this.model.start();
      }
    },
    changeYear: function() {
      this.model.set('year', parseInt($('#year').html()));
    },
    render: function () {
      $("#slider").slider("value", this.model.get('year'));
      this.$el.html(this.template(this.model.toJSON()));
    }
  });
})();
