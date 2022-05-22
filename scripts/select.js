const poke_stats = ["Type","Total","HP","Attack","Defense","Sp-Atk","Sp-Def","Speed","Egg-Group","Experience-type"];
const tormenta_stats = ["HP-base","HP-Nv","FOR","DES","CON","INT","SAB","CAR","Armor"];
const egggroups = { Amorphous: "Anatomia insana",
    Bug: "Articulações flexíveis",
    Ditto: "Impostor",
    Dragon: "Urro aterrador",
    Fairy: "Aparência inofensiva",
    Field: "Caminho dos Ermos",
    Flying: "Deslocamento de voo 12m",
    Grass: "Coração da selva",
    HumanLike: "Mãos hábeis",
    Mineral: "Pele rígida",
    Monster: "Faro ou Audição apurado",
    NoEggs: "Versátil",
    Water: "Deslocamento aquático 12m"
};


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
    var tstats = document.getElementById("tormenta-stats");
    var per = document.getElementById("pericias");
    

    if (imagem.hasChildNodes()) {
      let img = document.getElementById('pokemon-image');
      img.parentNode.removeChild(img);

      for(i in poke_stats){
        let paragrafo = document.getElementById(poke_stats[i]);
        paragrafo.parentNode.removeChild(paragrafo)
      }

      for(j in tormenta_stats){
        let paragrafo = document.getElementById(tormenta_stats[j]);
        paragrafo.parentNode.removeChild(paragrafo)
      }
    }

    var img = document.createElement("img");
    img.setAttribute("id", "pokemon-image")
    img.src = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + data[index]["Number"] + ".png"
    imagem.appendChild(img);

    for(i in poke_stats){
      let paragrafo = document.createElement("p");
      paragrafo.setAttribute("id", poke_stats[i]);
      let dado
      if(poke_stats[i] == "Type"){
        dado = document.createTextNode(data[index]["Type-1"] + "/" + data[index]["Type-2"]);
      } else if (poke_stats[i] == "Egg-Group"){
        dado = document.createTextNode(data[index]["Egg-Group-1"] + "/" + data[index]["Egg-Group-2"]);
      } else {
        dado = document.createTextNode(data[index][poke_stats[i]]);
      }
      paragrafo.appendChild(dado);
      pstats.appendChild(paragrafo);
    }

    for(j in tormenta_stats){
      let paragrafo = document.createElement("p");
      paragrafo.setAttribute("id", tormenta_stats[j]);
      let dado = document.createTextNode(data[index][tormenta_stats[j]]);
      paragrafo.appendChild(dado);
      tstats.appendChild(paragrafo);
    }


    if (egggroups[data[index]["Egg-Group-1"]] !== undefined){
      let paragrafo = document.createElement("p");
      let dado = document.createTextNode(egggroups[data[index]["Egg-Group-1"]]);
      paragrafo.appendChild(dado);
      per.appendChild(paragrafo);
    } else {
      let paragrafo = document.createElement("p");
      let dado = document.createTextNode(egggroups["NoEggs"]);
      paragrafo.appendChild(dado);
      per.appendChild(paragrafo);
    }
    if (egggroups[data[index]["Egg-Group-2"]] !== undefined){
      let paragrafo = document.createElement("p");
      let dado = document.createTextNode(egggroups[data[index]["Egg-Group-2"]]);
      paragrafo.appendChild(dado);
      per.appendChild(paragrafo);
    } else {
      let paragrafo = document.createElement("p");
      let dado = document.createTextNode(egggroups["NoEggs"]);
      paragrafo.appendChild(dado);
      per.appendChild(paragrafo);
    }


  });

select.selectAll("option")
.data(data)
.enter()
  .append("option")
  .attr("index", function (d) { return d.Index; })//atributo
  .text(function (d) { return d.Name; });//label

});
