export class Toast {
     constructor(message, duration = 3000) {
          this.message = message;
          this.duration = duration;
     }
     
     /**
      * Il crée un élément div, lui ajoute une classe, puis ajoute le div au DOM.
      */
     showCountOfResult() {
          const toast = document.createElement('div');
          toast.classList.add('toast');
          if (this.message === 0) {
               toast.innerHTML = ` <div class="toast-header bg-danger">
               <strong class="mr-auto">Les Petits Plats</strong>
               </div>
               <div class="toast-body bg-danger">
                 Aucun plat ne correspond à votre recherche
               </div>
               `;
          }else{
               toast.innerHTML = ` <div class="toast-header bg-success">
               <strong class="mr-auto">Les Petits Plats</strong>
               </div>
               <div class="toast-body bg-success">
                 Nous avons trouvé ${this.message} ${this.message > 1 ? 'plats' : 'plat'}
               </div>
               `;
          }

          document.querySelector('.resNum').appendChild(toast);
          setTimeout(() => {
               toast.remove();
          }, this.duration);
     }
}
