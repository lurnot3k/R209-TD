// token : 8356b25d0dd0d8f0447d702e3ce9e6d54bc9ea3241d087f1fd5ad56ef48c4ab5

function affichage(data) {
    let meteomax = document.createElement("div");
    let meteomin = document.createElement("div");
    let probapluie = document.createElement("div");
    let ensoleillement = document.createElement("div");

    meteomax.textContent = `temp max = ${data.forecast.tmax}`;
    meteomin.textContent = `temp min = ${data.forecast.tmin}`;
    probapluie.textContent = `proba = ${data.forecast.probarain}%`;
    ensoleillement.textContent = `ensoleillement = ${displayHours(data.forecast.sun_hours)}`;
}


function bouton() {
    let bouton = = document.createElement('div'):
    bouton.classList.add("bouton");
    document.body.appendChild(bouton);
    bouton.textContent = "recommencer";
}