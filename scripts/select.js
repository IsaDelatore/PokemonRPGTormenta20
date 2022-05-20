
d3.csv("https://raw.githubusercontent.com/IsaDelatore/PokemonRPG/main/pokemon.csv", function(error, data) {
  var select = d3.select(".dropbox")
  .append("select")

  select
  .on("change", function(d) {

    //Getting pokedex code and showing pokemon image, pokemon attributes and rpg attributes
    var test = document.querySelector('select')
    var index = test.options[test.selectedIndex].getAttribute("index")
    var imagem = document.getElementById("image");
    var pstats = document.getElementById("pokemon-stats");

    if (imagem.hasChildNodes()) {
      var img = document.getElementById('pokemon-image');
      img.parentNode.removeChild(img);

      var type = document.getElementById("type");
      type.parentNode.removeChild(type);
      var total = document.getElementById("total");
      total.parentNode.removeChild(total);
      var hp = document.getElementById("hp");
      hp.parentNode.removeChild(hp);
      var attack = document.getElementById("attack");
      attack.parentNode.removeChild(attack);
      var defense = document.getElementById("defense");
      defense.parentNode.removeChild(defense);
      var spatk = document.getElementById("spatk");
      spatk.parentNode.removeChild(spatk);
      var spdef = document.getElementById("spdef");
      spdef.parentNode.removeChild(spdef);
      var speed = document.getElementById("speed");
      speed.parentNode.removeChild(speed);
      var egg = document.getElementById("egg");
      egg.parentNode.removeChild(egg);
      var xptp = document.getElementById("xptp");
      xptp.parentNode.removeChild(xptp);

    }

    var img = document.createElement("img");
    img.setAttribute("id", "pokemon-image")
    img.src = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + data[index]["Number"] + ".png"
    imagem.appendChild(img);

    var ptype = document.createElement("p");
    ptype.setAttribute("id", "type");
    var ptotal = document.createElement("p");
    ptotal.setAttribute("id", "total");
    var php = document.createElement("p");
    php.setAttribute("id", "hp");
    var pattack = document.createElement("p");
    pattack.setAttribute("id", "attack");
    var pdefense = document.createElement("p");
    pdefense.setAttribute("id", "defense");
    var pspatk = document.createElement("p");
    pspatk.setAttribute("id", "spatk");
    var pspdef = document.createElement("p");
    pspdef.setAttribute("id", "spdef");
    var pspeed = document.createElement("p");
    pspeed.setAttribute("id", "speed");
    var pegg = document.createElement("p");
    pegg.setAttribute("id", "egg");
    var pxptp = document.createElement("p");
    pxptp.setAttribute("id", "xptp");

    var type = document.createTextNode(data[index]["Type-1"] + "/" + data[index]["Type-2"]);
    var total = document.createTextNode(data[index]["Total"]);
    var hp = document.createTextNode(data[index]["HP"]);
    var attack = document.createTextNode(data[index]["Attack"]);
    var defense = document.createTextNode(data[index]["Defense"]);
    var spatk = document.createTextNode(data[index]["Sp-Atk"]);
    var spdef = document.createTextNode(data[index]["Sp-Def"]);
    var speed = document.createTextNode(data[index]["Speed"]);
    var egg = document.createTextNode(data[index]["Egg-Group-1"] + "/" + data[index]["Egg-Group-2"]);
    var xptp = document.createTextNode(data[index]["Experience-type"]);

    ptype.appendChild(type);
    ptotal.appendChild(total);
    php.appendChild(hp);
    pattack.appendChild(attack);
    pdefense.appendChild(defense);
    pspatk.appendChild(spatk);
    pspdef.appendChild(spdef);
    pspeed.appendChild(speed);
    pegg.appendChild(egg);
    pxptp.appendChild(xptp);

    pstats.appendChild(ptype);
    pstats.appendChild(ptotal);
    pstats.appendChild(php);
    pstats.appendChild(pattack);
    pstats.appendChild(pdefense);
    pstats.appendChild(pspatk);
    pstats.appendChild(pspdef);
    pstats.appendChild(pspeed);
    pstats.appendChild(pegg);
    pstats.appendChild(pxptp);

  });

select.selectAll("option")
.data(data)
.enter()
  .append("option")
  .attr("index", function (d) { return d.Index; })//atributo
  .text(function (d) { return d.Name; });//label

});
