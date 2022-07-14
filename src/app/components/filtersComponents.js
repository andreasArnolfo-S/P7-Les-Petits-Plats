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

     /**
      * Pour chaque catégorie, ajoutez un filtre à la section Filtres, recherchez des éléments avec le nom
      * de la catégorie et cliquez sur l'élément.
      */
     filters() {
          this.categories.forEach(e => {
               this.sectionFilters.append(this.filtersTemplate(e.name, e.color))
               this.searchItemWithInput(e.name)
               this.clickOnItem(e.name, e.color)
          })

     }

     /**
      * @param categoryName - le nom de la catégorie
      * @param color - est la couleur du bouton
      * @returns la valeur de la variable this.tbn.
      */
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



     /**
      * C'est une fonction qui crée un bouton avec une valeur à partir d'une liste, puis filtre la liste par
      * la valeur du bouton.
      * @param categoryName - le nom de la catégorie sur laquelle on clique
      * @param color - est la couleur du bouton
      */
     clickOnItem(categoryName, color) {
          const list = document.querySelector(`#list-${categoryName}`);

          this.tagsValue = []

          list.addEventListener('click', (e) => {
               const value = e.target.innerHTML;
               
               this.cantDoubleSameTags(value)

               const btn = CreateElement('button', {
                    innerHtml: value + ' ' + '<i class="fa-solid fa-times"></i>',
               })

               this.tagsValue.push(value)
               btn.setAttribute('class', ` btn btn-${color} fing`)
               btn.addEventListener('click', () => {
                    btn.style.animation = 'fadeOut .6s forwards'
                    setTimeout(() => {
                         btn.remove()
                    }, 800)
                    this.tagsValue.splice(this.tagsValue.indexOf(value), 1)
                    this.tagsValue.length === 0 ? new SearchComponents(this.data).setList(value) : this.filteringByTags([...this.tagsValue], [...this.data]);
               })
               document.querySelector('.filter-box').appendChild(btn)
               
               this.filteringByTags([...this.tagsValue], [...this.data])

          })
     }


     /**
      * Il supprime la balise du tableau et du DOM si la balise existe déjà.
      * @param value - la valeur de la balise
      */
     cantDoubleSameTags (value) {
          const box = document.querySelector('.filter-box')

          box.childNodes.forEach(el => {
               if(el.innerHTML.includes(value)) {
                    this.tagsValue.splice(this.tagsValue.indexOf(value), 1)

                    el.remove()
               }
          })
     }
}