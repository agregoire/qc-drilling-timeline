/*global QcDrillingTimeline:true, $*/

QcDrillingTimeline = {
  init: function () {
    'use strict';
    this.clock = new this.Views.Clock({el: $('#clock')});
    this.map = new this.Views.Map();
    this.markersView = new this.Views.Markers({clock: this.clock.model});
    this.slider = new this.Views.Slider({clock: this.clock.model});
  },
  resizeMap: function() {
    var panelHeight = document.getElementById('panel').clientHeight;
    var windowHeight = $(window).height();
    $("#map-canvas").css("height", (windowHeight - panelHeight) + "px").css("top", panelHeight + "px");
  }
};

$(window).resize(function() {
  QcDrillingTimeline.resizeMap();
});

$(document).ready(function () {
  'use strict';
  QcDrillingTimeline.init();
  QcDrillingTimeline.resizeMap();
});
