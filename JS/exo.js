let tempdegr = 5
let tempfar = tempdegr * 9/5 + 32

// console.log(tempdegr,tempfar)

let L = 6
let l = 4

// console.log(l*L)

let nom = "DUBOUST"
let pnom = "Arthur"

// console.log(nom +" "+ pnom)

function TVA(x) {
    return x * 0.80
}

// console.log(TVA(100))

// console.log(((4 >= 6) || ("herbe" != "verte")) && !(((12 * 2) == 144) && true))

let poid = 69
let taille = 1.85

function IMC(poid,taille){
    return poid / (taille * taille)
}
// console.log(IMC(poid,taille))

function livraison(min,total){
    if (min <= total)
        return "livraison gratuite"
    if (min > total)
        return "Frais de livraison = 80€"
}

console.log(livraison(90,15))