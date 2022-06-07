import Plats from './../factory/plats';

export class Search {
     constructor(data) {
          this.url = '../../data/recipes.js';
          this.data = data
     }

     // template barre de recherche bootstrap
     searchTemplate() {
          return ` 
          <div class="input-box">
               <input type="text" class="form-control searchBar" placeholder='Rechercher une recette'>
               <i class="fa fa-search"></i>                    
          </div>
          `;
     }

     // method to display the search results



}