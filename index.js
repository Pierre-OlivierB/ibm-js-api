var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
// on selection une api selon le navigateur
var recognition = new SpeechRecognition();
// on crée l'objet par instantiation
recognition.continuous = false;
// le navigateur n'écoutera pas en continu et c'est une action de notre part qui lancera la reconnaissance
recognition.lang = "fr-FR";
// on définit la langue, surtout pour l'accent
recognition.interimResults = false;
//on ne souhaite pas avoir les résultats de l'interprétation en cours d'écoute
recognition.maxAlternatives = 1;

// !-------------------------------------
// *Audio
const audio = document.getElementById("playerAudio");
const audioTrack = [
  "./list/cinematic-documentary-115669.mp3",
  "./list/electronic-rock-king-around-here-15045.mp3",
  "./list/tunkhatunkha-20948.mp3",
];
var index = 0;
function nextAudio() {
  index++;
  if (index > audioTrack.length - 1) {
    index = 0;
  }
  audio.src = audioTrack[index];
}
function prevAudio() {
  index--;
  if (index < 0) {
    index = audioTrack.length - 1;
  }
  audio.src = audioTrack[index];
}

// !--------------------------------

var lancer = document.querySelector("#go");
// on sélectionne un élément de la page

lancer.addEventListener("click", fctLance);
// on lui attribue une action
function fctLance() {
  //et un evenement
  recognition.start();
}

// notre base de données de question et de réponse
var question = [
  "où est montpellier",
  "dans quel pays est montpellier",
  "j'ai faim",
  "j'ai soif",
  "dis-moi",
  "distance",
  "bonjour",
  "quel âge as-tu",
  "comment s'appelle le dernier dinosaure",
];
var reponse = [
  "dans le département de l'hérault",
  "en France",
  "va manger",
  "va boire de l'eau",
  "moi",
  "stance",
  "wesh",
  "moins que toi!",
  "denver",
];

// si un événement de reconnaissance fonctionne, on récupère le résultat
recognition.onresult = function (event) {
  var textReconnu = event.results[0][0].transcript;
  console.log("entendu: " + textReconnu);

  for (let key in question) {
    //on cherche la similitude dans la base pour afficher le résultat
    if (question[key] == textReconnu.toLowerCase()) {
      console.log(reponse[key]);
    }
    switch (textReconnu.toLowerCase()) {
      case "lance":
        audio.play();
        return console.log("lot");
      case "pause":
        audio.pause();
        return console.log("et je coupe le son");
      case "passe":
        nextAudio();
        audio.play();
        return console.log("le message à ton voisin");
      case "reviens":
        prevAudio();
        audio.play();
        return console.log("vite");
      case "baisse":
        if (audio.volume > 0) {
          audio.volume -= 0.5;
          return console.log("son baissé");
        }
        audio.volume = 0;
        return console.log("le son est au min");
      case "fort":
        if (audio.volume < 1) {
          audio.volume += 0.5;
          return console.log("son monté");
        }
        audio.volume = 1;
        return console.log("le son est au max");
      default:
        console.log("vous pouvez répéter la question ?");
        break;
    }
  }
};
