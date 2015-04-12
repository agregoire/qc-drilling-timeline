window.App = {
  init: function() {
    window.map = new Map;
    window.drillings = new Drillings(function() {
      window.map.placeMarkers(window.drillings.getDataForYear(1860))
    });

    window.clock = new Clock;
    $("#play").on("click", function() {
      window.clock.start();
    })
    $("#stop").on("click", function() {
      window.clock.stop();
    })
  }
}

$(document).ready(function () {
    App.init();
});
