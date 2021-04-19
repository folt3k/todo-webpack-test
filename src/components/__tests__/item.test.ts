import ItemComponent from '../item';

describe('list component', () => {
  it('should render correct', () => {
    const item = ItemComponent({ content: 'Foo', complete: true, id: 1 });
    const element = item.el;

    const clickedOutputSpy = jest.spyOn(item.clicked, 'next');
    const removedOutputSpy = jest.spyOn(item.removed, 'next');

    document.body.appendChild(element);

    expect(element.classList.contains('item--complete')).toBeTruthy();

    (element.querySelector('.item__status') as HTMLElement).click();
    expect(clickedOutputSpy).toHaveBeenCalled();

    (element.querySelector('.item__close') as HTMLElement).click();
    expect(removedOutputSpy).toHaveBeenCalled();
  });
});
