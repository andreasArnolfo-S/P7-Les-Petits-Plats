import { SearchComponents } from './../components/searchComponents';
import { Toast } from './../components/toast';

export class FiltersController {

     constructor(data) {

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

          for (let e of this.categories) {
               this.displayItems(e.name, result)

          }

          return this.filteringByTags(tagsValues, result)

     }

     /**
      * Il prend un nom de catégorie comme argument, puis parcourt le tableau de données, place le nom de la
      * catégorie dans un tableau vide, filtre le tableau pour supprimer les doublons, puis renvoie le
      * tableau sous la forme d'une chaîne d'éléments HTML.
      * @param categoryName - le nom de la catégorie que vous souhaitez afficher
      * @returns Un tableau de chaînes.
      */
     displayItems(categoryName, data) {

          if (categoryName === 'ingredients') {
               this.ingredients = []
               const setIngredients = new Set()
               data.forEach(el => {
                    el.ingredients.forEach(ing => {
                         setIngredients.add(ing.ingredient.toLowerCase())
                    })

               })
               this.ingredients = Array.from(setIngredients)
               const listIngredients = document.querySelector('#list-ingredients')
               return listIngredients.innerHTML = this.ingredients.map(el => `<li value='${el}' class="dropdown-item ingItem" href="#">${el}</li>`).join('')
          }
          else if (categoryName === 'appliance') {
               this.appareils = []
               const setAppliance = new Set()
               data.forEach(el => {

                    setAppliance.add(el.appliance.toLowerCase())

               })
               this.appareils = Array.from(setAppliance)
               const listAppareils = document.querySelector('#list-appliance')
               return listAppareils.innerHTML = this.appareils.map(el => `<li value='${el}' class="dropdown-item appItem" href="#">${el}</li>`).join('')
          }
          else if (categoryName === 'ustensils') {
               this.ustensiles = []
               const setUstensils = new Set()
               data.forEach(el => {

                    el.ustensils.forEach(ust => {

                         setUstensils.add(ust.toLowerCase())

                    })

               })
               this.ustensiles = Array.from(setUstensils)
               const listUstensils = document.querySelector('#list-ustensils')
               return listUstensils.innerHTML = this.ustensiles.map(el => `<li value='${el}' class="dropdown-item ustItem" href="#">${el}</li>`).join('')
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