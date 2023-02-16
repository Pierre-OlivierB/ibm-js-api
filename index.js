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
];
var reponse = [
  "dans le département de l'hérault",
  "en France",
  "va manger",
  "va boire de l'eau",
];

// si un événement de reconnaissance fonctionne, on récupère le résultat
recognition.onresult = function (event) {
  var textReconnu = event.results[0][0].transcript;
  console.log("entendu: " + textReconnu);

  for (key in question) {
    //on cherche la similitude dans la base pour afficher le résultat
    if (question[key] == textReconnu.toLowerCase()) {
      console.log(reponse[key]);
    }
  }
};
