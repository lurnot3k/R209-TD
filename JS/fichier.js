document.addEventListener("DOMContentLoaded", () => {
    //Sélection des éléments
    const codePostalInput = document.getElementById("codepostal");
    const communeSelect = document.getElementById("communeSelect");
    const validationButton = document.getElementById("validationButton");
  
    function villeCP(codepostal) {
        return fetch(`https://geo.api.gouv.fr/communes?codePostal=${codepostal}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                //console.log(data); // Affiche les données JSON dans la console

                // Récupérer tous les codes
                let codeInsee = [];
                let nomDesVilles = [];
                for (const commune of data) { // Parcourt chaque commune dans le tableau
                    codeInsee.push(commune.code); // Ajoute le code de la commune au tableau
                    nomDesVilles.push(commune.nom)                    
                }
                //console.log(codeInsee); // Affiche tous les codes INSEE
                //console.log(nomDesVilles)

                return { codeInsee, nomDesVilles };
            })
            .catch(error => {
                console.error(`Error: ${error.message}`);
            });

               
    }

    // Fonction pour faire le menu pour choisi la ville

    function menuChoixVille(codePostal) {
        // Si le code postal est vide, on ne fait rien
        if (!codePostal) {
            return;
        }
    
        // Appel de la fonction villeCP pour récupérer les données de l'API
        villeCP(codePostal).then(resultatAPI => {
            // Si aucun résultat n'est retourné, on ne fait rien
            if (!resultatAPI) return;
    
            const resultat = resultatAPI;
            const lesVilles = resultat["nomDesVilles"];  // Tableau des noms de villes
            const lesCodesInsee = resultat["codeInsee"];  // Tableau des codes INSEE
    
            // Vider le menu déroulant avant de le remplir avec de nouvelles options
            communeSelect.innerHTML = "<option value=''>Sélectionner une ville</option>";
    
            // Parcourir les résultats et ajouter chaque ville dans le menu déroulant
            for (let i = 0; i < lesCodesInsee.length; i++) {
                const option = document.createElement("option");  // Créer un élément <option>
                option.value = lesCodesInsee[i];  // Utiliser le code INSEE comme valeur
                option.textContent = lesVilles[i];  // Utiliser le nom de la ville comme texte
                communeSelect.appendChild(option);  // Ajouter l'option dans le <select>
            }
        })
        .catch(error => {
            console.error(`Error: ${error.message}`);  // Afficher une erreur si la récupération des données échoue
        });
    }
    

    codePostalInput.addEventListener("input", async () => {
        const codePostal = codePostalInput.value;


        // Vérifie si le code postal est bien un code à 5 chiffres
        if (/^\d{5}$/.test(codePostal)) {
            try {
                // Appelle ta fonction existante qui met à jour le menu déroulant
                await menuChoixVille(codePostal);

                // Si tout s'est bien passé, on réaffiche les éléments
                communeSelect.style.display = "block";
                validationButton.style.display = "inline-block";
            } catch (error) {
                console.error("Erreur lors du chargement des communes :", error);
            }
        }
    });


    validationButton.addEventListener("click", async () => {
        const selectedCommune = communeSelect.value;
    
        if (selectedCommune) {
            try {
                await meteoVille(selectedCommune);  
            } catch (error) {
                console.error("Erreur lors de la requête API meteoConcept :", error);
            }
        }
    });
    

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

//villeCP(14123)

menuChoixVille(14123)