export class Toast {
     constructor(message, duration = 3000) {
          this.message = message;
          this.duration = duration;
     }
     show() {
          const toast = document.createElement('div');
          toast.classList.add('toast');
          toast.innerHTML = ` <div class="toast-header bg-success">
                                 <strong class="mr-auto">Les Petits Plats</strong>
                                 </div>
                                 <div class="toast-body bg-success">
                                   Nous avons trouvé ${this.message} ${this.message > 1 ? 'plats' : 'plat'}
                                 </div>
                                 `;


          document.querySelector('.resNum').appendChild(toast);
          setTimeout(() => {
               toast.remove();
          }, this.duration);
     }

     showZero() {
          const toast = document.createElement('div');
          toast.classList.add('toast');
          toast.innerHTML = ` <div class="toast-header bg-danger">
                                 <strong class="mr-auto">Les Petits Plats</strong>
                                 </div>
                                 <div class="toast-body bg-danger">
                                   Aucun plat ne correspond à votre recherche
                                 </div>
                                 `;


          document.querySelector('.resNum').appendChild(toast);
          setTimeout(() => {
               toast.remove();
          }, this.duration);
     }
}
