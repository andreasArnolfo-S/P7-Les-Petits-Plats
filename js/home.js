import { Api } from './api/api';
import { Search } from './components/search';
import '../css/style.scss'
import Plats from './factory/plats';
import { Filter } from './components/filter';

class Home {
     constructor() {
          this.data = new Api
          this.search = document.getElementById('search');
          this.sectionPlat = document.querySelector('.plats');
          this.filters = document.querySelector('.filters');
     }

     async launch() {
          this.data = await this.data.getPlats();
          this.search.innerHTML = new Search(this.data).searchTemplate()
          this.filters.innerHTML = new Filter().template();

          this.displayPlats();
     }

     displayPlats() {
          const search = document.querySelector('.input-box');

          search.addEventListener('keyup', (e) => {
               const searchValue = e.target.value;
               const result = this.data.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase()));
               this.sectionPlat.innerHTML = '';
               result.forEach(el => {
                    this.sectionPlat.appendChild(new Plats(el).renderPlat());
               })
          })
          
          this.data.forEach(el => {
               const p = new Plats(el);
               this.sectionPlat.appendChild(p.renderPlat());
          })

     }
}

const home = new Home();
home.launch();