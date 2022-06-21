import { CreateElement } from './../utils/createElement';
import { Search } from './search';
import Plats from './plats';
export class filters {
    constructor(data) {
        this.sectionFilters = document.querySelector('.section-filters');
        this.sectionPlat = document.querySelector('.section-plats');

        this.data = data
    }

    filtersTemplate(categoryName, color) {
        const tbn = CreateElement('div', {
            innerHtml: `
            <div class="menu-header closed" id="menu-header-close-${categoryName}" isActive="false">
                  <button class="btn btn-${color}"
                          id="btn-${categoryName}" 
                          type="button" 
                          aria-expanded="false"
                          aria-controls="${categoryName}">${categoryName}
                          <i id="caret-down" class="fas fa-angle-down"></i>
                  </button>
                  
              </div>
              <div class="menu-header open" id="menu-header-open-${categoryName}" isActive="true">
                  <input id="searchInto-${categoryName}" class="searchInput" placeholder="rechercher un ${categoryName}">
                  <i id="caret-up" class="fas fa-angle-up up-${categoryName}"></i>
              </div>
              <div class="collapse multi-collapse category-menu" id="menu-${categoryName}" isOpen="false">
                  <div class="card bg-${color}" id="body-items">
                      <ul id="${categoryName}-list" class="list bg-${color}">
                          ${this.displayItems(categoryName)}
                      </ul>
                  </div>
              </div>
            `
        })

        this.sectionFilters.setAttribute('isActive', 'false'); // default component state
        this.sectionFilters.setAttribute('id', 'collapsing-' + categoryName); // default component state

        return tbn
    }

    openFilters(name) {
        this.isclose = document.getElementById('menu-header-close-' + name);
        this.isopen = document.getElementById('menu-header-open-' + name);
        this.list = document.querySelector('#menu-' + name);
        this.isopen.style.display = 'none';
        this.isclose.addEventListener('click', () => {
            this.isclose.style.display = 'none';
            this.isopen.style.display = 'flex';
            this.list.style.display = 'flex';

            this.sectionFilters.setAttribute('isActive', 'true');
            this.sectionFilters.querySelector(`#menu-${name}`).setAttribute('isOpen', 'true');
            this.sectionFilters.querySelector(`#menu-header-close-${name}`).setAttribute('isActive', 'false');
            this.sectionFilters.querySelector(`#menu-header-open-${name}`).setAttribute('isActive', 'true');
            this.sectionFilters.querySelector(`#searchInto-${name}`).focus();
        });

        this.closeFilters(name);
        const bts = document.querySelector('.adv-search-wrapper');
        bts.classList.add('row', 'col-12', 'col-lg-6');
    }

    closeFilters(categoryName) {
        const c = document.querySelector('.up-' + categoryName);
        c.addEventListener('click', () => {
            this.isclose.style.display = 'block';
            this.isopen.style.display = 'none';
            this.list.style.display = 'none';

            this.sectionFilters.setAttribute('isActive', 'false');
            this.sectionFilters.querySelector(`#menu-${categoryName}`).setAttribute('isOpen', 'false');
            this.sectionFilters.querySelector(`#menu-header-close-${categoryName}`).setAttribute('isActive', 'true');
            this.sectionFilters.querySelector(`#menu-header-open-${categoryName}`).setAttribute('isActive', 'false');
        })

        this.list.addEventListener('click', (e) => {
            if (e.target !== this.list) {
                this.isclose.style.display = 'block';
                this.isopen.style.display = 'none';
                this.list.style.display = 'none';

                this.sectionFilters.setAttribute('isActive', 'false');
                this.sectionFilters.querySelector(`#menu-${categoryName}`).setAttribute('isOpen', 'false');
                this.sectionFilters.querySelector(`#menu-header-close-${categoryName}`).setAttribute('isActive', 'true');
                this.sectionFilters.querySelector(`#menu-header-open-${categoryName}`).setAttribute('isActive', 'false');
            }
        })

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
        const searchInput = document.getElementById('searchInto-' + categoryName);
        searchInput.addEventListener('keyup', () => {
            const value = searchInput.value.toLowerCase();
            const items = document.querySelectorAll(`#menu-${categoryName} .dropdown-item`);
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
        const items = document.querySelectorAll(`#${categoryName}-list li`);
        
        items.forEach(el => {
            el.addEventListener('click', () => {
                const value = el.getAttribute('value');
                const btn = CreateElement('button', {
                    innerHtml: value
                })
                btn.setAttribute('class', ` btn btn-${color} fing`)
                btn.addEventListener('click', () => {
                    btn.remove()
                })
                document.querySelector('.filter-box').appendChild(btn)

                return this.filterSearch(value)
            })
        })
    }

    // filtrer les recettes selon les elements selectionnés
    filterSearch(value, data) {
        if (data === undefined || data === null) {
            data = this.data
        } else {
            data = this.arr
        }
        this.arr = []
        data.filter(el => {
            if (el.ingredients.some(ing => ing.ingredient.toLowerCase() === value) || el.appliance.toLowerCase() === value || el.ustensils.some(ust => ust.toLowerCase() === value)) {
                this.arr.push(el)
            } 
        })
        console.log(this.arr)
        this.displayRecipes(this.arr)
    }

    displayRecipes(array) {

        this.sectionPlat.innerHTML = '';

        for (let e of array) {
            this.sectionPlat.appendChild(new Plats(e).renderPlat());
        }
        return this.data = array
    }




}