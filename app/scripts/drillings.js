var Drillings = function(callback) {
  var context = this;

  Papa.parse("/drillings.csv", {
    download: true,
    header: true,
    complete: function(results) {
      context.data = results;
      callback();
    }
  });
}

Drillings.prototype.getData = function() {
  return this.data.data;
}

Drillings.prototype.getDataForYear = function(year) {
  var filteredData = new Array;
  for (var i = this.data.data.length - 1; i >= 0; i--) {
    if ((year >= this.data.data[i].start) && (year <= this.data.data[i].end)) {
      filteredData.push(this.data.data[i]);
    }
  }

  return filteredData;
}