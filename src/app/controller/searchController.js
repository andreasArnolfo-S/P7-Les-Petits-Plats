import { SearchComponents } from './../components/searchComponents';

export class SearchController {

     constructor(data) {
          this.search = document.querySelector('.input-box');
          this.data = data
     }

     searchPlats() {
          this.search.addEventListener('input', (e) => {
               const searchValue = e.target.value;
               if (searchValue.length > 2) {
                    this.searchAlgo(searchValue);
               } else {
                    this.searchPlats()
               }

          })

          new SearchComponents(this.data).setList()
     }

     searchAlgo(value) {
          this.cards = document.querySelectorAll('.card');
          let i = 0;
          while (i < this.cards.length) {
               if (this.cards[i].textContent.toLowerCase().includes(value.toLowerCase())) {
                    this.cards[i].style.display = 'block';
               } else {
                    this.cards[i].style.display = 'none';
               }
               i++;
          }

     }
     



}