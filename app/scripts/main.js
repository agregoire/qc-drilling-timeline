/*global Qcdrillingtimeline, $*/


window.QcDrillingTimeline = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function () {
    'use strict';
    new this.Views.Map;
  }
};

$(document).ready(function () {
    'use strict';
    QcDrillingTimeline.init();
});
