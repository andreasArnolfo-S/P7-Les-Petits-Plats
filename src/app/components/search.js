import Plats from './plats';

export class Search {

     constructor(data) {
          this.data = data
          this.sectionPlat = document.querySelector('.section-plats');
          this.body = document.querySelector('body');
     }

     displayPlats() {
          const search = document.querySelector('.input-box');

          search.addEventListener('input', (e) => {
               const searchValue = e.target.value;
               if (searchValue.length > 2) {

                    const sortedPlats = this.searchPlats(this.data, searchValue);
                    this.sectionPlat.innerHTML = '';
                    sortedPlats.forEach(plat => {
                         const plats = new Plats(plat);
                         this.sectionPlat.appendChild(plats.renderPlat());
                    })
                    if (this.sectionPlat.innerHTML === "") {
                         return document.querySelector('.zeroResult').innerHTML = ` <div class="jumbotron w-75">
                         <h1 class="display-4">:(</h1>
                         <p class="lead">Aucun résultat ! </p>
                         <hr class="my-4">
                         <p>Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson »...</p>
                         <a class="btn btn-primary btn-lg" href="/src" role="button">Retour</a>
                       </div>`
                    }
               } else {
                    this.displayPlats()
               }
          })



          for (let el of this.data) {
               this.sectionPlat.appendChild(new Plats(el).renderPlat());
          }

     }

     // search plats by name with boucle while
     searchPlats(data, searchValue) {
          let i = 0;
          let tab = [];
          while (i < data.length) {
               if (data[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
                    tab.push(data[i]);
               }
               i++;
          }

          return tab
     }


}