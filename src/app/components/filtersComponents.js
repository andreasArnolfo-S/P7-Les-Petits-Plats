import { FiltersController } from '../controller/filtersController';
import { CreateElement } from './../utils/createElement';
import { SearchComponents } from './searchComponents';
import { tagsValue, resultRecipes } from './../utils/global';
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
               this.displayItems(e.name, this.data)
               this.searchItemWithInput(e.name)
               this.clickOnItem(e.name, e.color)
          })

     }

     clickOnItem(categoryName, color) {
          const list = document.querySelector(`#list-${categoryName}`);

          list.addEventListener('click', (e) => {
               const value = e.target.innerHTML;
               
               this.cantDoubleSameTags(value)

               const btn = CreateElement('button', {
                    innerHtml: value + ' ' + '<i class="fa-solid fa-times"></i>',
               })

               tagsValue.push(value)
               btn.setAttribute('class', ` btn btn-${color} fing`)
               btn.addEventListener('click', () => {
                    btn.style.animation = 'fadeOut .6s forwards'
                    setTimeout(() => {
                         btn.remove()
                    }, 800)
                    tagsValue.splice(tagsValue.indexOf(value), 1)
                    tagsValue.length === 0 ? new SearchComponents(this.data).setList(value) : this.filteringByTags([...tagsValue], [...this.data]);
                    this.categories.forEach(e => {
                         this.displayItems(e.name, this.data)
                    })              
               })
               document.querySelector('.filter-box').appendChild(btn)
               if (resultRecipes.length > 0) {
                    this.filteringByTags([...tagsValue], [...resultRecipes]);
               } else {
                    this.filteringByTags([...tagsValue], [...this.data])
               }

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