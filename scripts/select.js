const poke_stats = ["Type","Total","HP","Attack","Defense","Sp-Atk","Sp-Def","Speed","Egg-Group","Experience-type"];
const tormenta_stats = ["HP-base","HP-Nv","FOR","DES","CON","INT","SAB","CAR","Armor"];

const typepericia = {
  GRASS: "Sobrevivência, fortitude, culinária ou intuição",
  FIRE: "Intimidação ou luta",
  WATER: "Vontade ou pontaria",
  BUG: "Furtividade, acrobacia, percepção ou reflexos",
  NORMAL: "Treinamento em 3 perícias quaisquer",
  DARK: "Enganação ou ladinagem",
  POISON: "Alquimia, cura, fortitude ou sobrevivência",
  ELECTRIC: "Iniciativa, pontaria, acrobacia ou reflexos",
  GROUND: "Sobrevivência, fortitude, furtividade ou guerra",
  ICE: "Vontade",
  FAIRY: "Misticismo, religião, diplomacia ou intuição",
  STEEL: "",
  FIGHTING: "Luta, atletismo, fortitude ou guerra",
  PSYCHIC: "Conhecimento, misticismo, religião ou intuição",
  ROCK: "",
  GHOST: "Furtividade",
  DRAGON: "Intimidação, fortitude, luta ou atletismo",
  FLYING: "Percepção, pontaria, reflexos ou acrobacia"
}

d3.csv("https://raw.githubusercontent.com/IsaDelatore/PokemonRPG/main/data/pokemon.csv", function(error, pokemon) {
  d3.csv("https://raw.githubusercontent.com/IsaDelatore/PokemonRPG/main/data/poderes.csv", function(error, poderes){
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
      var pod = document.getElementById("poderes");
      var per = document.getElementById("pericias");

      var paragrafo;
      var dado;
      var botao;

      //Clear stats if has any to show new ones
      if (imagem.hasChildNodes()) {
        let img = document.getElementById('pokemon-image');
        img.parentNode.removeChild(img);

        for(i in poke_stats){
          paragrafo = document.getElementById(poke_stats[i]);
          paragrafo.parentNode.removeChild(paragrafo);
        }

        for(j in tormenta_stats){
          paragrafo = document.getElementById(tormenta_stats[j]);
          paragrafo.parentNode.removeChild(paragrafo);
        }

        paragrafo = document.getElementsByClassName("pericia");
        for(var i = paragrafo.length - 1; i >= 0; i--){
            paragrafo[i].remove()
        }

        paragrafo = document.getElementsByClassName("row poder");
        for(var i = paragrafo.length - 1; i >= 0; i--){
            paragrafo[i].remove()
        }
      }

      //Showing pokemon image
      var img = document.createElement("img");
      img.setAttribute("id", "pokemon-image");
      if (pokemon[index]["Name"].includes("Alolan")){
        img.src = "https://www.serebii.net/pokemon/art/" + pokemon[index]["Number"] + "-a.png";
      } else if (pokemon[index]["Name"].includes("Galarian")){
        img.src = "https://www.serebii.net/pokemon/art/" + pokemon[index]["Number"] + "-g.png";
      } else {
        img.src = "https://www.serebii.net/pokemon/art/" + pokemon[index]["Number"] + ".png";
      }
      imagem.appendChild(img);

      //Showing pokemon stats
      for(i in poke_stats){
        paragrafo = document.createElement("p");
        paragrafo.setAttribute("id", poke_stats[i]);
        if(poke_stats[i] == "Type"){
          dado = document.createTextNode(pokemon[index]["Type-1"] + "/" + pokemon[index]["Type-2"]);
        } else if (poke_stats[i] == "Egg-Group"){
          dado = document.createTextNode(pokemon[index]["Egg-Group-1"] + "/" + pokemon[index]["Egg-Group-2"]);
        } else {
          dado = document.createTextNode(pokemon[index][poke_stats[i]]);
        }
        paragrafo.appendChild(dado);
        pstats.appendChild(paragrafo);
      }

      //Showing Tormenta stats
      for(j in tormenta_stats){
        paragrafo = document.createElement("p");
        paragrafo.setAttribute("id", tormenta_stats[j]);
        dado = document.createTextNode(pokemon[index][tormenta_stats[j]]);
        paragrafo.appendChild(dado);
        tstats.appendChild(paragrafo);
      }

      //Showing abilities
      for (i in poderes){
        if (poderes[i]["eggGroup"] !== "") {
          if (poderes[i]["eggGroup"] == pokemon[index]["Egg-Group-1"]) {
            pod.innerHTML += '<div class="row poder"><div class="col-10"><p>'+ poderes[i]["Poder"] + '</p></div>' +
            '<div class="col-2"><button class="btn btn-primary btn-info btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#descricao-' + poderes[i]["eggGroup"] + '" aria-expanded="false" aria-controls="descricao">v</button></div>' +
            '<div class="collapse" id="descricao-' + poderes[i]["eggGroup"] + '"><div class="card card-body">' + poderes[i]["Descricao"] + '</div></div>' +
            '</div>'

          } else if (poderes[i]["eggGroup"] == pokemon[index]["Egg-Group-2"] && pokemon[index]["Egg-Group-2"] !== undefined) {
            pod.innerHTML += '<div class="row poder"><div class="col-10"><p>'+ poderes[i]["Poder"] + '</p></div>' +
            '<div class="col-2"><button class="btn btn-primary btn-info btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#descricao-' + poderes[i]["eggGroup"] + '" aria-expanded="false" aria-controls="descricao">v</button></div>' +
            '<div class="collapse" id="descricao-' + poderes[i]["eggGroup"] + '"><div class="card card-body">' + poderes[i]["Descricao"] + '</div></div>' +
            '</div>'
          }
        }
        if (poderes[i]["Tipo"] !== "") {
          if (poderes[i]["Tipo"] == pokemon[index]["Type-1"]) {
            pod.innerHTML += '<div class="row poder"><div class="col-10"><p>'+ poderes[i]["Poder"] + '</p></div>' +
            '<div class="col-2"><button class="btn btn-primary btn-info btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#descricao-' + poderes[i]["eggGroup"] + '" aria-expanded="false" aria-controls="descricao">v</button></div>' +
            '<div class="collapse" id="descricao-' + poderes[i]["eggGroup"] + '"><div class="card card-body">' + poderes[i]["Descricao"] + '</div></div>' +
            '</div>'

          } else if (poderes[i]["Tipo"] == pokemon[index]["Type-2"] && pokemon[index]["Type-2"] !== undefined) {
            pod.innerHTML += '<div class="row poder"><div class="col-10"><p>'+ poderes[i]["Poder"] + '</p></div>' +
            '<div class="col-2"><button class="btn btn-primary btn-info btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#descricao-' + poderes[i]["eggGroup"] + '" aria-expanded="false" aria-controls="descricao">v</button></div>' +
            '<div class="collapse" id="descricao-' + poderes[i]["eggGroup"] + '"><div class="card card-body">' + poderes[i]["Descricao"] + '</div></div>' +
            '</div>'
        }
      }
    }

      //Showing skills
      paragrafo = document.createElement("p");
      dado = document.createTextNode(typepericia[pokemon[index]["Type-1"]]);
      paragrafo.setAttribute("class", "pericia");
      paragrafo.appendChild(dado);
      per.appendChild(paragrafo);
      if (typepericia[pokemon[index]["Type-2"]] !== undefined){
        paragrafo = document.createElement("p");
        dado = document.createTextNode(typepericia[pokemon[index]["Type-2"]]);
        paragrafo.setAttribute("class", "pericia");
        paragrafo.appendChild(dado);
        per.appendChild(paragrafo);
    }

    });

  select.selectAll("option")
  .data(pokemon)
  .enter()
    .append("option")
    .attr("index", function (d) { return d.Index; })//atributo
    .text(function (d) { return d.Name; });//label
  });
});
