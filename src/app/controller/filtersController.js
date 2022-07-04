import { SearchComponents } from './../components/searchComponents';

export class FiltersController {

     constructor(data) {
          this.data = data
     }

     test(value) {
          
          console.log(value)
          this.arr2 = [...this.data] //all recipes
          console.log(this.arr2)
          for (let v of value) {
               for (let i = 0; i < this.arr2.length; i++) {
                    if (this.arr2[i].ingredients.some(ing => ing.ingredient.toLowerCase().includes(v)) || this.arr2[i].ustensils.some(ust => ust.toLowerCase().includes(v)) || this.arr2[i].appliance.toLowerCase().includes(v)) {
                         console.log(this.arr2[i])
                    }
                    else {
                         this.arr2.splice(i);
                    }
               }
          }
          console.log(this.arr2)

          return new SearchComponents(this.arr2).setList()
     }


     displayItems(categoryName) {
          if (categoryName === 'ingredients') {
               this.ingredients = []
               this.data.forEach(el => {
                    el.ingredients.map(ing => this.ingredients.push(ing.ingredient.toLowerCase()));
               })
               const filteredArray = this.ingredients.filter((ele, pos) => this.ingredients.indexOf(ele) == pos);
               return filteredArray.slice(0, 50).map(el => `<li value='${el}' class="dropdown-item ingItem" href="#">${el}</li>`).join('')
          } else if (categoryName === 'appliance') {
               this.appareils = []
               this.data.forEach(el => {
                    this.appareils.push(el.appliance.toLowerCase())
               })
               const filteredArray = this.appareils.filter((ele, pos) => this.appareils.indexOf(ele) == pos);
               return filteredArray.map(el => `<li value='${el}' class="dropdown-item appItem" href="#">${el}</li>`).join('')
          } else if (categoryName === 'ustensils') {
               this.ustensiles = []
               this.data.forEach(el => {
                    el.ustensils.map(ing => this.ustensiles.push(ing.toLowerCase()));
               })
               const filteredArray = this.ustensiles.filter((ele, pos) => this.ustensiles.indexOf(ele) == pos);
               return filteredArray.map(el => `<li value='${el}' class="dropdown-item ustItem" href="#">${el}</li>`).join('')
          }
     }

     searchItemWithInput(categoryName) {
          const searchInput = document.querySelector(`#dropdownMenuButton${categoryName}`);
          searchInput.addEventListener('keyup', () => {
               const value = searchInput.value.toLowerCase();
               const items = document.querySelectorAll(`.dropdown-item`);

               for (let el of items) {
                    if (el.textContent.toLowerCase().indexOf(value) != -1) {
                         el.style.display = 'block';
                    } else {
                         el.style.display = 'none';
                    }
               }

          })
     }

}