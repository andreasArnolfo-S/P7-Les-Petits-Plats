import Plats from './plats';

export class Search {

     constructor(data) {
          this.data = data
          this.sectionPlat = document.querySelector('.section-plats');
     }

     displayPlats() {
          const search = document.querySelector('.input-box');

          search.addEventListener('input', (e) => {
               const searchValue = e.target.value;
               if (searchValue.length > 2) {
                    
                    const sortedPlats = this.searchPlats(this.data, searchValue);
                    console.log(sortedPlats);

                    this.sectionPlat.innerHTML = '';
                    sortedPlats.forEach(plat => {
                         const plats = new Plats(plat);
                         this.sectionPlat.appendChild(plats.renderPlat());
                    })
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