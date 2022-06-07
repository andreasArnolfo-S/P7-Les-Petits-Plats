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
          const data = await this.data.getPlats();
          this.search.innerHTML = new Search().searchTemplate()
          this.filters.innerHTML = new Filter().template();
          
          for (let el of data) {
               const p = new Plats(el);
               this.sectionPlat.appendChild(p.renderPlat());
          }
     }
}

const home = new Home();
home.launch();