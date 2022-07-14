import './sass/style.scss';
import { Data } from './app/modules/fetchData';
import { SearchComponents } from './app/components/searchComponents';
import { SearchController } from './app/controller/searchController';
import { FiltersComponents } from './app/components/filtersComponents';

class Main {
     constructor() {
          this.data = new Data();
          this.sectionFilters = document.querySelector('.section-filters');
     }

     async init() {
          const data = await this.data.getPlats();


          new SearchComponents(data).setList();
          new SearchController(data).searchPlats();

          
          new FiltersComponents(data).filters()
     }
}

const main = new Main();
main.init();