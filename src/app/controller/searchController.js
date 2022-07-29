import { SearchComponents } from './../components/searchComponents';
import { FiltersController } from './filtersController';
import { FiltersComponents } from './../components/filtersComponents';
import { tagsValue, resultRecipes } from './../utils/global';

export class SearchController {

     constructor(data) {

          this.search = document.querySelector('.input-box');
          this.data = data

     }
     /**
      * Il parcourt un tableau et renvoie true si la valeur est trouvée dans le tableau.
      * @param array - Le tableau à parcourir
      * @param value - La valeur à rechercher.
      * @returns vrai
      */
     some(array, value){
          for(let i = 0; i < array.length-1; i++){
               if(array[i] === value){
                    return true;
               }
          }
          return false;
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

               if (searchValue.length > 2) {
                    const result = this.searchAlgo(searchValue);

                    new SearchComponents(result).setList()
                    const filterComponents = new FiltersComponents()

                    filterComponents.displayItems('ingredients', result)
                    filterComponents.displayItems('appliance', result)
                    filterComponents.displayItems('ustensils', result)
               } else {
                    this.searchPlats()
               }
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
          resultRecipes.splice(0, resultRecipes.length);
          while (i < this.data.length) {

               if (this.data[i].name.toLowerCase().includes(value.toLowerCase()) ||
                         this.some(this.data[i].ingredients, value.toLowerCase()) ||               
                         this.data[i].description.toLowerCase().includes(value.toLowerCase())) {
                    tab.push(this.data[i]);
                    resultRecipes.push(this.data[i]);
               }

               
               i++;
          }

          return new FiltersController([...tab]).filteringByTags([...tagsValue], [...tab])

     }




}