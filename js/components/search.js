export class Search {
     constructor() {
          this.url = '../../data/recipes.js';
     }

     // template barre de recherche bootstrap
     searchTemplate() {
          return ` 
          <div class="input-box">
               <input type="text" class="form-control" placeholder='Rechercher une recette'>
               <i class="fa fa-search"></i>                    
          </div>
          `;
     }

}