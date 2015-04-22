/*global QcDrillingTimeline, Backbone, JST*/

QcDrillingTimeline.Views = QcDrillingTimeline.Views || {};

(function () {
  'use strict';

  QcDrillingTimeline.Views.Clock = Backbone.View.extend({
    template: JST['app/scripts/templates/clock.ejs'],
    initialize: function () {
      this.model = new QcDrillingTimeline.Models.Clock;
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },
    events: {
      "click #play": "startClock",
      "click #stop": "stopClock",
      "change #year": "changeYear"
    },
    startClock: function() {
      this.model.start();
    },
    stopClock: function() {
      this.model.stop();
    },
    changeYear: function() {
      this.model.set("year", parseInt($("#year").val()));
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
    }
  });
})();
