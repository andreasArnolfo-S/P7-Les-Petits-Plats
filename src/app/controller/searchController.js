import { SearchComponents } from './../components/searchComponents';

export class SearchController {

     constructor(data) {

          this.search = document.querySelector('.input-box');
          this.data = data

     }



     /**
      * Lorsque l'utilisateur tape dans la barre de recherche, si la saisie est supérieure à 2 caractères,
      * exécutez l'algorithme de recherche et affichez les résultats dans le composant de recherche. Si la
      * saisie est inférieure à 2 caractères, réinitialisez le composant de recherche pour afficher toutes
      * les données.
      */
     searchPlats() {

          this.search.addEventListener('input', (e) => {
               const searchValue = e.target.value;

               searchValue.length > 2 ? new SearchComponents(this.searchAlgo(searchValue)).setList() : this.searchPlats();
          })

          new SearchComponents(this.data).setList()

     }

     /**
      * Il prend une chaîne comme argument et renvoie un tableau d'objets contenant la chaîne dans leur nom,
      * leurs ingrédients ou leur description.
      * @param value - la valeur recherchée par l'utilisateur
      * @returns Un tableau d'objets.
      */
     searchAlgo(value) {

          let tab = [];
          let i = 0;

          while (i < this.data.length) {
               if (this.data[i].name.toLowerCase().includes(value.toLowerCase()) ||
                    this.data[i].ingredients.some(ing => ing.ingredient.toLowerCase().includes(value.toLowerCase())) ||
                    this.data[i].description.toLowerCase().includes(value.toLowerCase())) {
                    tab.push(this.data[i]);
               }
               i++;
          }

          return tab;

     }




}