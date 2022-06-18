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
                    const result = this.data.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase()));
                    this.sectionPlat.innerHTML = '';
                    result.forEach(el => {
                         this.sectionPlat.appendChild(new Plats(el).renderPlat());
                    })
                    
               } //sinon on affiche tout
               else {
                    this.displayPlats();
               }
               
          })
          
          this.data.forEach(el => {
               this.sectionPlat.appendChild(new Plats(el).renderPlat());
          })
     }
}