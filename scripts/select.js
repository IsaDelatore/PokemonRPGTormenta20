
d3.csv("https://raw.githubusercontent.com/IsaDelatore/PokemonRPG/main/pokemon.csv", function(error, data) {
  var select = d3.select(".dropbox")
  .append("select")

  select
  .on("change", function(d) {

    //Getting pokedex code and showing pokemon image
    var test = document.querySelector('select')
    var index = test.options[test.selectedIndex].getAttribute("index")
    var imagem = document.getElementById("image");

    if (imagem.hasChildNodes()) {
      var img = document.getElementById('aaa');
      img.parentNode.removeChild(img);
    }

    var img = document.createElement("img");
    img.setAttribute("id", "aaa")
    img.src = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + data[index]["Number"] + ".png"
    imagem.appendChild(img);



  });

select.selectAll("option")
.data(data)
.enter()
  .append("option")
  .attr("index", function (d) { return d.Index; })//atributo
  .text(function (d) { return d.Name; });//label

});
