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
               return (searchValue.length > 2) ? new SearchComponents(this.sortedPlats).setList() : this.searchPlats();

          })

          new SearchComponents(this.data).setList()
     }

     searchAlgo(value) {
          let i = 0;
          let tab = [];
          while (i < this.data.length) {
               if (this.data[i].name.toLowerCase().includes(value.toLowerCase()) ||
                    this.data[i].ingredients.some(ing => ing.ingredient.toLowerCase().includes(value.toLowerCase())) ||
                    this.data[i].description.toLowerCase().includes(value.toLowerCase())) {
                    tab.push(this.data[i]);
               }
               i++;
          }

          return tab
     }



}