import { FiltersController } from '../controller/filtersController';
import { CreateElement } from './../utils/createElement';

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
               innerHtml: `
               <input placeholder="${categoryName}" class="bg-${color}" id="dropdownMenuButton${categoryName}" data-toggle="dropdown" aria-expanded="false">
               </input>
               <label><i class="fa-solid fa-angle-down"></i></label>
               <div class="dropdown-menu bg-${color} list" id="list-${categoryName}" aria-labelledby="dropdownMenuButton${categoryName}">
                    ${this.displayItems(categoryName)}
               </div>
             `
          })

          this.tbn.setAttribute('class', `dropdown btn btn-${color} btn-lg `)

          const bts = document.querySelector('.adv-search-wrapper');
          bts.classList.add('row', 'col-12', 'col-lg-12');

          return this.tbn
     }



     clickOnItem(categoryName, color) {
          const list = document.querySelector(`#list-${categoryName}`);

          this.arr = []

          list.addEventListener('click', (e) => {
               const value = e.target.innerHTML;
               
               this.cantDoubleSameTags(value)

               const btn = CreateElement('button', {
                    innerHtml: value + ' ' + '<i class="fa-solid fa-times"></i>',
               })

               this.arr.push(value)
               btn.setAttribute('class', ` btn btn-${color} fing`)
               btn.addEventListener('click', () => {
                    btn.style.animation = 'fadeOut .6s forwards'
                    setTimeout(() => {
                         btn.remove()
                    }, 800)
                    this.arr.splice(this.arr.indexOf(value), 1)
                    this.test(this.arr, this.data)

               })
               document.querySelector('.filter-box').appendChild(btn)
               // this.test(this.arr, this.data)
               console.log(this.test(this.arr, this.data))

          })
     }


     cantDoubleSameTags (value) {
          const box = document.querySelector('.filter-box')

          box.childNodes.forEach(el => {
               if(el.innerHTML.includes(value)) {
                    this.arr.splice(this.arr.indexOf(value), 1)

                    el.remove()
               }
          })
     }
}