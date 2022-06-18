import './sass/style.scss';
import { Data } from './app/modules/fetchData';
import { Search } from './app/components/search';
import { filters } from './app/components/filters';

class Main {
     constructor() {
          this.data = new Data();
          this.sectionFilters = document.querySelector('.section-filters');
     }

     async init() {
          const data = await this.data.getPlats();
          new Search(data).displayPlats();

          const categories = ['ingredients', 'appliance', 'ustensils'];
          categories.forEach(cat => {
               if (cat === 'ingredients') { this.color = 'primary'; }
               if (cat === 'appliance') { this.color = 'success'; }
               if (cat === 'ustensils') { this.color = 'danger'; }
               this.sectionFilters.appendChild(new filters(data).filtersTemplate(cat, this.color));
               new filters(data).openFilters(cat);
               new filters(data).searchItemWithInput(cat)
               new filters(data).clickOnItem(cat, this.color);
          })

     }
}

const main = new Main();
main.init();