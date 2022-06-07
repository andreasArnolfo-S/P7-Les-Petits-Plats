/* eslint-disable no-useless-call */

/**
 * Il crée un élément du type spécifié dans le premier argument, puis définit les attributs spécifiés
 * dans le deuxième argument
 * @param type - Le type d'élément que vous souhaitez créer.
 * @param attributes - {
 * @returns L'élément qui a été créé.
 */
 export function CreateElement (type, attributes) {
     const element = document.createElement(type)

     if (attributes !== undefined || attributes !== null) {
          for (const key in attributes) {
               if (key === 'class') {
                    element.classList.add.call(element.classList, attributes[key])
               } else if (key === 'innerHtml') {
                    element.innerHTML = attributes[key]
               } else if (key === 'tabindex') {
                    element.setAttribute('tabindex', attributes[key])
               } else if (key === 'ariaLabel') {
                    element.setAttribute('aria-label', attributes[key])
               } else {
                    element[key] = attributes[key]
               }
          }
     }

     return element
}
