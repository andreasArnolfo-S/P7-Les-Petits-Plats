import { SearchComponents } from './../components/searchComponents';

export class SearchController {

     constructor(data) {
          this.search = document.querySelector('.input-box');
          this.data = data
     }

     searchPlats() {
          this.search.addEventListener('input', (e) => {
               const searchValue = e.target.value;
               this.sortedPlats = this.searchAlgo(searchValue);
               //commence lorsque l’utilisateur entre au moins 3 caractères dans la barre de recherche principale.
               return (searchValue.length > 2) ? new SearchComponents(this.sortedPlats).setList(searchValue) : this.searchPlats();

          })

          new SearchComponents(this.data).setList()
     }

     searchAlgo(value) {
          return this.data.filter(el => {
               if (el.name.toLowerCase().includes(value) ||
                    el.ingredients.some(ing => ing.ingredient.toLowerCase().includes(value)) ||
                    el.description.toLowerCase().includes(value)) {
                    return el
               }
          })
     }
     



}