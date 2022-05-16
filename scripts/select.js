d3.csv("https://gist.githubusercontent.com/armgilles/194bcff35001e7eb53a2a8b441e8b2c6/raw/92200bc0a673d5ce2110aaad4544ed6c4010f687/pokemon.csv", function(error, data) {
  var select = d3.select(".container")
  .append("div")
  .append("select")

  select
  .on("change", function(d) {
    var name = d3.select(this).property("Name");
    alert(name);
  });

select.selectAll("option")
.data(data)
.enter()
  .append("option")
  .attr("Name", function (d) { return d.Name; })
  .text(function (d) { return d.Name; });

});
