import { FiltersController } from '../controller/filtersController';
import { CreateElement } from './../utils/createElement';
import { SearchComponents } from './searchComponents';

export class FiltersComponents {

     constructor(data) {
          this.sectionFilters = document.querySelector('.section-filters');
          this.data = data
          this.categories = [
               {
                    name: 'ingredients',
                    color: 'primary'
               },
               {
                    name: 'appliance',
                    color: 'success'
               },
               {
                    name: 'ustensils',
                    color: 'danger'
               }
          ];
     }

     filters() {
          this.categories.forEach(e => {
               this.sectionFilters.append(this.filtersTemplate(e.name, e.color))
               this.searchItemWithInput(e.name)
               this.clickOnItem(e.name, e.color)
          })

     }

     filtersTemplate(categoryName, color) {
          this.tbn = CreateElement('div', {
               class: 'dropdown',
               innerHtml: `
               <input placeholder="rechercher un ${categoryName} &#xf078" class="btn btn-${color} btn-lg dropdown-toggle" id="dropdownMenuButton${categoryName}" data-toggle="dropdown" aria-expanded="false">
               </input>
               <div class="dropdown-menu bg-${color} list" id="list-${categoryName}" aria-labelledby="dropdownMenuButton${categoryName}">
                    ${this.displayItems(categoryName)}
               </div>
             `

          })

          const bts = document.querySelector('.adv-search-wrapper');
          bts.classList.add('row', 'col-12', 'col-lg-12');



          return this.tbn
     }

     searchItemWithInput(categoryName) {
          const searchInput = document.querySelector(`#dropdownMenuButton${categoryName}`);
          searchInput.addEventListener('keyup', () => {
               const value = searchInput.value.toLowerCase();
               const items = document.querySelectorAll(`.dropdown-item`);
               items.forEach(el => {
                    if (el.textContent.toLowerCase().indexOf(value) != -1) {
                         el.style.display = 'block';
                    } else {
                         el.style.display = 'none';
                    }
               })
          })
     }

     clickOnItem(categoryName, color) {
          const list = document.querySelector(`#list-${categoryName}`);
          list.addEventListener('click', (e) => {
               const value = e.target.innerHTML;
               const btn = CreateElement('button', {
                    innerHtml: value
               })
               btn.setAttribute('class', ` btn btn-${color} fing`)
               btn.addEventListener('click', () => {
                    btn.remove()
                    this.test(value, this.tabdeux)
               })
               document.querySelector('.filter-box').appendChild(btn)
               this.test(value, this.tabdeux)
          })

     }

     test(value, data) {

          this.tabdeux = []

          if (data === undefined || data === null || data.length <= 0) {
               data = this.data
          }

          for (let el of data) {
               if (el.ingredients.some(ing => ing.ingredient.toLowerCase() === value) ||
                    el.appliance.toLowerCase() === value ||
                    el.ustensils.some(ust => ust.toLowerCase() === value)) {

                    this.tabdeux.push(el)

               }
          }
          return new SearchComponents(this.tabdeux).setList()
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
}