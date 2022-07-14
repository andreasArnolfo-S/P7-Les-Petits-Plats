import { SearchComponents } from './../components/searchComponents';
import { Toast } from './../components/toast';

export class FiltersController {

     constructor(data) {

          this.data = data

     }

     /**
      * La fonction est récursive et fonctionne en prenant la première balise du tableau de balises et en
      * filtrant le tableau de recettes pour n'inclure que les recettes contenant cette balise. Ensuite, il
      * s'appelle avec les balises restantes et le tableau de recettes filtré.
      * 
      * La fonction s'appelle ainsi :
      * 
      *      filteringByTags(tagsValues, array)
      * 
      * Où `tagsValues` est un tableau de balises et `array` est un tableau de recettes.
      * 
      * @param tagsValues - un tableau de chaînes
      * @param array - un tableau d'objets
      * @returns Le résultat de la fonction filteringByTags.
      */
     filteringByTags(tagsValues, array) {

          if (tagsValues.length === 0) {
               return array
          }
          const result = []
          for (let i = 0; i < array.length; i++) {
               if (array[i].ingredients.some(el => el.ingredient.toLowerCase().includes(tagsValues[0]))) {
                    result.push(array[i])
               } else if (array[i].ustensils.some(ust => ust.toLowerCase().includes(tagsValues[0]))) {
                    result.push(array[i])
               } else if (array[i].appliance.toLowerCase().includes(tagsValues[0])) {
                    result.push(array[i])
               }
          }

          tagsValues.splice(0, 1)
          
          new Toast(result.length).showCountOfResult()
          
          new SearchComponents(result).setList(tagsValues)

          return this.filteringByTags(tagsValues, result)

     }

     /**
      * Il prend un nom de catégorie comme argument, puis parcourt le tableau de données, place le nom de la
      * catégorie dans un tableau vide, filtre le tableau pour supprimer les doublons, puis renvoie le
      * tableau sous la forme d'une chaîne d'éléments HTML.
      * @param categoryName - le nom de la catégorie que vous souhaitez afficher
      * @returns Un tableau de chaînes.
      */
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

     /**
      * Il prend un nom de catégorie comme argument, puis il ajoute un écouteur d'événement à l'entrée de
      * recherche de cette catégorie, puis il filtre les éléments de cette catégorie en fonction de la
      * valeur de l'entrée de recherche.
      * @param categoryName - le nom de la catégorie dans laquelle vous souhaitez effectuer la recherche
      */
     searchItemWithInput(categoryName) {
          const searchInput = document.querySelector(`#dropdownMenuButton${categoryName}`);
          searchInput.addEventListener('keyup', () => {
               const value = searchInput.value.toLowerCase();
               const items = document.querySelectorAll(`.dropdown-item`);

               for (let el of items) {
                    el.textContent.toLowerCase().indexOf(value) != -1 ? el.style.display = 'block' : el.style.display = 'none';
               }

          })
     }

}