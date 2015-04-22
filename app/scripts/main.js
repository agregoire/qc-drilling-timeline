/*global QcDrillingTimeline:true, $*/

QcDrillingTimeline = {
  init: function () {
    'use strict';
    this.clock = new this.Views.Clock({el: $('#clock')});
    this.map = new this.Views.Map();
    this.markersView = new this.Views.Markers({clock: this.clock.model});
  }
};

$(document).ready(function () {
  'use strict';
  QcDrillingTimeline.init();
});
