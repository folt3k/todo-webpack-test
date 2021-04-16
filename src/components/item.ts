import { TodoItem } from '../interfaces';
import { Subject } from 'rxjs';

const ItemComponent = ({
  content,
  complete,
  id,
}: TodoItem): { el: Element; clicked: Subject<void>; removed: Subject<void> } => {
  const el = document.createElement('div');
  const clicked = new Subject<void>();
  const removed = new Subject<void>();

  el.setAttribute('data-id', id.toString());
  el.classList.add('item');

  el.innerHTML = `
    <div class="item__content">
        <div class="item__status"></div>
        <span class="item__label">${content}</span>
    </div>
    <button class="item__close">&times;</button>
`;

  if (complete) {
    el.classList.add('item--complete');
  }

  el.querySelector('.item__status').addEventListener('click', () => {
    clicked.next();
  });

  el.querySelector('.item__close').addEventListener('click', () => {
    removed.next();
  });

  return { el, clicked, removed };
};

export default ItemComponent;
