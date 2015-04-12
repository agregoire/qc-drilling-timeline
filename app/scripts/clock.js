var Clock = function() {
  this.year = 1860;
  this.maxYear = 2012;
  this.minYear = 2012;
  this.timeout = null;
  $("#year").attr({
    min: this.minYear,
    max: this.maxYear,
    step: 1
  });
  $("#year").val(this.year);
}

Clock.prototype.start = function() {
  var context = this;
  this.timeout = setTimeout(function() {
    var year = parseInt($("#year").val());
    var newYear = year + 1;
    $("#year").val(newYear);
    window.map.placeMarkers(window.drillings.getDataForYear(newYear));
    context.start()
  }, 500)
}

Clock.prototype.stop = function() {
  clearTimeout(this.timeout);
}