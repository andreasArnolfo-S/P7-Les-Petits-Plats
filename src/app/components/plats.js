import { CreateElement } from './../utils/createElement';

export default class Plats {
     constructor (data) {
          this.data = data;
     }

     renderPlat() {
          const card = CreateElement('div', { 
               class: 'card',
               innerHtml: `<img class="card-img-top" src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80" alt="Card image cap">
               <div class="card-body">
                    <div class="d-flex justify-content-between">
                         <h5 class="card-title">${this.data.name}</h5>
                         <h5 class="card-title">${this.data.time} min</h5>
                    </div>

                    <div class="d-flex justify-content-between ztext">
                         <div class="ing_list">
                              <ul class='myList'>
                                ${this.data.ingredients.map(el => 
                                   `<li>${el.ingredient + ': ' + (el.quantity !== undefined ? el.quantity : '') + (el.unit !== undefined ? el.unit : '')}</li>`).join('')}
                              </ul>
                         </div>
                         <div class="desc">
                              <p class='text-start'>${this.data.description}</p>
                         </div>
                    </div>
               </div> `
          });

          return card
     }
}