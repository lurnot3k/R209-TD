// token : 8356b25d0dd0d8f0447d702e3ce9e6d54bc9ea3241d087f1fd5ad56ef48c4ab5

function affichage(data) {

    let meteomax = document.createElement("div");
    let meteomin = document.createElement("div");
    let probapluie = document.createElement("div");
    let ensoleillement = document.createElement("div");

    meteomax.textContent = `temp max = ${data.forecast.tmax}`;
    meteomin.textContent = `temp min = ${data.forecast.tmin}`;
    probapluie.textContent = `proba de pluie = ${data.forecast.probarain}%`;
    ensoleillement.textContent = `ensoleillement = ${heures(data.forecast.sun_hours)}`;

    let bouton = document.createElement('div');
    bouton.classList.add("bouton");
    document.body.appendChild(bouton);
    bouton.textContent = "recommencer";
    bouton.addEventListener("click", function () {
        location.reload();
    })

    let meteo = document.getElementById("info_meteo");
    let requete = document.getElementById("ville");
    meteo.appendChild(meteomin);
    meteo.appendChild(meteomax);
    meteo.appendChild(probapluie);
    meteo.appendChild(ensoleillement);

    requete.style.display = "none";
    meteo.style.display = "flex";
}

function heures(ensoleillement) {
    return ensoleillement + (ensoleillement > 1 ? " heures" : " heure");
}