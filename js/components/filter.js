import { CreateElement } from './../utils/createElement';

export class Filter {
     constructor(data) {
          this.url = '../../data/recipes.js';
          this.data = data
     }

     // filter card width 
     template() {
          return `

          

          <div class="dropdown inputFilter">
               <input class="btn btn-primary dropdown-toggle infil" list='ingList' href="#" placeholder='ingredients' role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
               
               </input>

               <div class="dropdown-menu bg-primary" aria-labelledby="dropdownMenuLink" id="ingList" >
                    ${this.ingredients()} 
               </div>
          </div>

          <div class="dropdown inputFilter">
               <input class="btn btn-success dropdown-toggle infil" href="#" placeholder='appareils' role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
               
               </input>

               <div class="dropdown-menu bg-success" aria-labelledby="dropdownMenuLink">
                    ${this.appareils()}  
               </div>
          </div>

          <div class="dropdown inputFilter">
               <input class="btn btn-danger dropdown-toggle infil" href="#" placeholder='ustensils' role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
               
               </input>

               <div class="dropdown-menu bg-danger" aria-labelledby="dropdownMenuLink">
                    ${this.ustensiles()} 
               </div>
          </div>
          `
     }

     ingredients() {

          this.ingredients = []
          this.data.forEach(el => {
               el.ingredients.map(ing => this.ingredients.push(ing.ingredient.toLowerCase()));
          })
          const filteredArray = this.ingredients.filter((ele, pos) => this.ingredients.indexOf(ele) == pos);
          return filteredArray.slice(0, 30).map(el => `<option value='${el}' class="dropdown-item" href="#">${el}</option>`)
     }

     appareils() {
          this.appareils = []
          this.data.forEach(el => {
               this.appareils.push(el.appliance.toLowerCase())
          })
          const filteredArray = this.appareils.filter((ele, pos) => this.appareils.indexOf(ele) == pos);
          return filteredArray.map(el => `<option value='${el}' class="dropdown-item" href="#">${el}</option>`)
     }

     ustensiles() {
          this.ustensiles = []
          this.data.forEach(el => {
               el.ustensils.map(ing => this.ustensiles.push(ing.toLowerCase()));
          })
          const filteredArray = this.ustensiles.filter((ele, pos) => this.ustensiles.indexOf(ele) == pos);
          return filteredArray.map(el => `<option value='${el}' class="dropdown-item" href="#">${el}</option>`)

     }

     onClick() {
          const op = document.querySelectorAll('.dropdown-item');

          op.forEach(el => {
               el.addEventListener('click', () => {
                    console.log(el.value)
                    const resulting = this.data.filter(e => e.ingredients.filter(ing => ing.ingredient.toLowerCase().includes(el.value.toLowerCase())));
                    console.log(resulting)
                    const btn = CreateElement('button', {
                         class: 'btnfil',
                         innerHtml: el.innerHTML
                    })
                    btn.setAttribute('class', 'btn btn-primary')
                    btn.addEventListener('click', () => {
                         btn.remove()
                    })
                    document.querySelector('.filter-box').appendChild(btn)
                    return btn
               })
          })

     }


     


}