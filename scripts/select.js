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
const typepoder = {
  FIRE: "Criar elemento: fogo",
  WATER: "Criar elemento: água",
  DARK: "Visão no escuro",
  ICE: "RD (físico) 1 +1/4Nv",
  STEEL: "RD(físico) 1+1/2Nv",
  ROCK: "RD 2 +1/4Nv",
  GHOST: "Invisibilidade"
};

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

d3.csv("https://raw.githubusercontent.com/IsaDelatore/PokemonRPG/main/pokemon.csv", function(error, pokemon) {
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

      paragrafo = document.getElementsByClassName("poder");
      for(var i = paragrafo.length - 1; i >= 0; i--){
          paragrafo[i].remove()
      }

      paragrafo = document.getElementsByClassName("pericia");
      for(var i = paragrafo.length - 1; i >= 0; i--){
          paragrafo[i].remove()
      }
    }

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

    for(j in tormenta_stats){
      paragrafo = document.createElement("p");
      paragrafo.setAttribute("id", tormenta_stats[j]);
      dado = document.createTextNode(pokemon[index][tormenta_stats[j]]);
      paragrafo.appendChild(dado);
      tstats.appendChild(paragrafo);
    }


    if (egggroups[pokemon[index]["Egg-Group-1"]] !== undefined){
      paragrafo = document.createElement("p");
      dado = document.createTextNode(egggroups[pokemon[index]["Egg-Group-1"]]);
    } else {
      paragrafo = document.createElement("p");
      dado = document.createTextNode(egggroups["NoEggs"]);
    }
    paragrafo.setAttribute("class", "poder");
    paragrafo.appendChild(dado);
    pod.appendChild(paragrafo);
    if (egggroups[pokemon[index]["Egg-Group-2"]] !== undefined){
      paragrafo = document.createElement("p");
      dado = document.createTextNode(egggroups[pokemon[index]["Egg-Group-2"]]);
    } else {
      paragrafo = document.createElement("p");
      dado = document.createTextNode(egggroups["NoEggs"]);
    }
    paragrafo.setAttribute("class", "poder");
    paragrafo.appendChild(dado);
    pod.appendChild(paragrafo);


    if (typepoder[pokemon[index]["Type-1"]] !== undefined){
      paragrafo = document.createElement("p");
      dado = document.createTextNode(typepoder[pokemon[index]["Type-1"]]);
      paragrafo.setAttribute("class", "poder");
      paragrafo.appendChild(dado);
      pod.appendChild(paragrafo);
    }
    if (typepoder[pokemon[index]["Type-2"]] !== undefined){
      paragrafo = document.createElement("p");
      dado = document.createTextNode(typepoder[pokemon[index]["Type-2"]]);
      paragrafo.setAttribute("class", "poder");
      paragrafo.appendChild(dado);
      pod.appendChild(paragrafo);
    }

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
