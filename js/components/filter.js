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
                    <input class="dropdown-item w-100 bg-white"></input>    
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
          const filteredArray = this.ingredients.filter( (ele, pos)=> this.ingredients.indexOf(ele) == pos);
          console.log(filteredArray)
          return filteredArray.slice(0,30).map(el => `<option value='${el}' class="dropdown-item" href="#">${el}</option>`)
     }

     appareils() {
          this.appareils = []
          this.data.forEach(el => {
               this.appareils.push(el.appliance.toLowerCase())               
          })
          const filteredArray = this.appareils.filter( (ele, pos)=> this.appareils.indexOf(ele) == pos);
          return filteredArray.slice(0,30).map(el => `<option value='${el}' class="dropdown-item" href="#">${el}</option>`)
     }

     ustensiles() {
          this.ustensiles = []
          this.data.forEach(el => {
               el.ustensils.map(ing => this.ustensiles.push(ing.toLowerCase()));               
          })
          const filteredArray = this.ustensiles.filter( (ele, pos)=> this.ustensiles.indexOf(ele) == pos);
          return filteredArray.slice(0,30).map(el => `<option value='${el}' class="dropdown-item" href="#">${el}</option>`)

     }

}