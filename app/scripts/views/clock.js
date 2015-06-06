/*global QcDrillingTimeline, Backbone*/

QcDrillingTimeline.Views = QcDrillingTimeline.Views || {};

(function () {
  'use strict';

  QcDrillingTimeline.Views.Clock = Backbone.View.extend({
    template: JST['app/scripts/templates/clock.ejs'],
    initialize: function () {
      this.model = new QcDrillingTimeline.Models.Clock();
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },
    events: {
      'click #play': 'toggleClock',
      'change #year': 'changeYear'
    },
    toggleClock: function() {
      if (this.model.get('running') === true) {
        this.model.stop();
      } else {
        this.model.start();
      }
    },
    stopClock: function() {
      this.model.stop();
    },
    changeYear: function() {
      this.model.set('year', parseInt($('#year').html()));
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
    }
  });
})();
