//  Класс Section (отрисовка элементов на странице)  //

export default class Section {
    constructor({ renderer }, container) {
      this._container = document.querySelector(container);
      this._renderer = renderer;
    }

//  Публичный - создаем и вставляем новую карточку в разметку в начало  //    
    renderCard(item) { 
      this._renderer(item);
    }

//  Публичный - отрисовываем имеющиеся карточки мест  //    
    renderItems(items) {
      this._renderedItems = items;
      this._renderedItems.forEach((item) => {
        this._renderer(item);
      });
    };
  
//  Публичный - создаем и (пока не) вставляем новую карточку в разметку в начало  //
//  Ревьюер рекомендовал здесь сразу сделать const card = this._renderer(element)  //
    addItem(element) {
      this._container.prepend(element);
    }


//  Публичный - Очищаем галерею  //
    clear() {
      this._container.innerHTML = '';
    };
}