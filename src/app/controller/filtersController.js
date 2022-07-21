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

          for (let e of this.categories) {
               this.displayItems(e.name, result)

          }

          return this.filteringByTags(tagsValues, result)

     }


     displayItems(categoryName, data) {

          if (categoryName === 'ingredients') {
               this.ingredients = []
               const setIngredients = new Set()
               data.forEach(el => {
                    el.ingredients.forEach(ing => {
                         setIngredients.add(ing.ingredient.toLowerCase())
                    })

               })
               this.ingredients = Array.from(setIngredients)
               const listIngredients = document.querySelector('#list-ingredients')
               return listIngredients.innerHTML = this.ingredients.map(el => `<li value='${el}' class="dropdown-item ingItem" href="#">${el}</li>`).join('')
          }
          else if (categoryName === 'appliance') {
               this.appareils = []
               const setAppliance = new Set()
               data.forEach(el => {

                    setAppliance.add(el.appliance.toLowerCase())

               })
               this.appareils = Array.from(setAppliance)
               const listAppareils = document.querySelector('#list-appliance')
               return listAppareils.innerHTML = this.appareils.map(el => `<li value='${el}' class="dropdown-item appItem" href="#">${el}</li>`).join('')
          }
          else if (categoryName === 'ustensils') {
               this.ustensiles = []
               const setUstensils = new Set()
               data.forEach(el => {

                    el.ustensils.forEach(ust => {

                         setUstensils.add(ust.toLowerCase())

                    })

               })
               this.ustensiles = Array.from(setUstensils)
               const listUstensils = document.querySelector('#list-ustensils')
               return listUstensils.innerHTML = this.ustensiles.map(el => `<li value='${el}' class="dropdown-item ustItem" href="#">${el}</li>`).join('')
          }
     }

     searchItemWithInput(categoryName) {
          const searchInput = document.querySelector(`#dropdownMenuButton${categoryName}`);
          searchInput.addEventListener('keyup', () => {
               const value = searchInput.value.toLowerCase();
               const items = document.querySelectorAll(`.dropdown-item`);

               for (let el of items) {
                    el.textContent.toLowerCase().indexOf(value) != -1 ? el.style.display = 'block' : el.style.display = 'none';
               }

          })
     }

}