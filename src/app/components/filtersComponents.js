import { FiltersController } from '../controller/filtersController';
import { CreateElement } from './../utils/createElement';
import { SearchComponents } from './searchComponents';

export class FiltersComponents extends FiltersController {

     constructor(data) {
          super(data)
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


}