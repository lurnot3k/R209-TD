document.addEventListener("DOMContentLoaded", () => {
    // Sélection des éléments
    const codePostalInput = document.getElementById("code-postal");
    const communeSelect = document.getElementById("communeSelect");
    const validationButton = document.getElementById("validationButton");
  
    function villeCP(codepostal) {
        fetch(`https://geo.api.gouv.fr/communes?codePostal=${codepostal}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Affiche les données JSON dans la console

                // Récupérer tous les codes
                let codeInsee = [];
                for (const commune of data) { // Parcourt chaque commune dans le tableau
                    codeInsee.push(commune.code); // Ajoute le code de la commune au tableau
                }
                console.log(codeInsee); // Affiche tous les codes INSEE
            })
            .catch(error => {
                console.error(`Error: ${error.message}`);
            });
    }

    let token_meteo = "8356b25d0dd0d8f0447d702e3ce9e6d54bc9ea3241d087f1fd5ad56ef48c4ab5";

    function meteoVille(codeInsee) {
        fetch(`https://api.meteo-concept.com/api/forecast/daily?insee=${codeInsee}&token=${token_meteo}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Affiche les données JSON dans la console
            })
            .catch(error => {
                console.error(`Error: ${error.message}`);
            });
    }
});

villeCP(14123)
