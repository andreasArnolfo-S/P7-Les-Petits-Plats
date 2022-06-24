import Plats from './plats';

export class SearchComponents {

     constructor (data) {

          this.data = data
          this.sectionPlat = document.querySelector('.section-plats');

     }

     setList() {

          this.clearList();
          
          for (let el of this.data) {
               this.sectionPlat.appendChild(new Plats(el).renderPlat());
          }

          if(this.data.length === 0) {
               this.setNoResults();
          }

     }

     clearList() {
          this.sectionPlat.innerHTML = ''
     }

     setNoResults() {

          return document.querySelector('.zeroResult').innerHTML = ` 
          <div class="jumbotron w-75">
               <h1 class="display-4">:(</h1>
               <p class="lead">Aucun résultat ! </p>
               <hr class="my-4">
               <p>Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson »...</p>
               <a class="btn btn-primary btn-lg" href="/src" role="button">Retour</a>
          </div>`

     }

}