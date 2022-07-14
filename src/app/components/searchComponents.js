import Plats from './plats';

export class SearchComponents {

     constructor(data) {

          this.data = data
          this.sectionPlat = document.querySelector('.section-plats');
     }

     /**
      * Il prend une valeur, efface la liste, parcourt les données et ajoute les données à la sectionPlat.
      * 
      * Si les données sont vides, il définit le message d'absence de résultats.
      * 
      * Si les données ne sont pas vides, cela efface le message d'absence de résultats.
      * @param value - la valeur du champ de saisie
      */
     setList(value) {

          this.clearList();

          for (let el of this.data) {
               this.sectionPlat.appendChild(new Plats(el).renderPlat());
          }
          this.data.length === 0 ? this.setNoResults(value) : document.querySelector('.zeroResult').innerHTML = '';

     }

     /**
      * Il efface le innerHTML de l'élément sectionPlat.
      */
     clearList() {
          this.sectionPlat.innerHTML = ''
     }

     /**
      * Il prend une valeur comme argument et renvoie une chaîne HTML.
      * @param value - la valeur de l'entrée de recherche
      * @returns le code HTML du div avec la classe "zeroResult"
      */
     setNoResults(value) {

          return document.querySelector('.zeroResult').innerHTML = ` 
          <div class="jumbotron w-75">
               <h1 class="display-4">:(</h1>
               <p class="lead">Aucun résultat ! </p>
               <hr class="my-4">
               <p>Aucune recette ne correspond à votre critère '${value}' vous pouvez chercher « tarte aux pommes », « poisson »...</p>
               <a class="btn btn-primary btn-lg" href="/src" role="button">Retour</a>
          </div>`

     }

}