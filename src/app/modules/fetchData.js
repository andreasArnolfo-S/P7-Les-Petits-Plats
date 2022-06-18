import { recipes } from './recipes';

export class Data {
     constructor() {
          this.url = '../../data/recipes.js';
     }
     
     getPlats() {
          return recipes
     }

}