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
               if (searchValue.length > 2) {
                    const result = this.searchAlgo(searchValue);
                    new SearchComponents(result).setList();
               } else {
                    this.searchPlats()
               }

          })

          new SearchComponents(this.data).setList()

     }

     searchAlgo(value) {

          return this.data.filter(el => {
               if (el.name.toLowerCase().includes(value.toLowerCase()) || el.ingredients.some(ing => ing.ingredient.toLowerCase().includes(value.toLowerCase())) || el.description.toLowerCase().includes(value.toLowerCase())) {
                    return el
               }
          })


     }

}