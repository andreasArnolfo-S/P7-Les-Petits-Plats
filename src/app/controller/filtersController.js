import { SearchComponents } from './../components/searchComponents';
import { Toast } from './../components/toast';

export class FiltersController {

     constructor(data) {
          this.data = data
     }

     filteringByTags(tagsValues, array) {

          if (tagsValues.length === 0) {
               return array
          }
          const result = []
          
          array.forEach(el => {
               if (el.ingredients.some(ing => tagsValues.includes(ing.ingredient.toLowerCase())) || el.appliance.toLowerCase().includes(tagsValues) || el.ustensils.some(ust => tagsValues.includes(ust.toLowerCase()))) {
                    result.push(el)
               }
          })

          tagsValues.splice(0, 1)
          
          new Toast(result.length).showCountOfResult()
          
          new SearchComponents(result).setList(tagsValues)

          return this.filteringByTags(tagsValues, result)

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