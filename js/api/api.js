import { recipes } from './../../data/recipes';

export class Api {
     constructor() {
          this.url = '../../data/recipes.js';
     }
     
     getPlats() {
          return recipes
     }
     
     getPlat(id) {
          return fetch(this.url)
               .then(response => response.json())
               .then(data => data.plats.find(plat => plat.id === id));
     }
}