import addEventListener from '../../src/lib/addEventListener';

export default class App {
  private element: HTMLElement;
  private addButton: HTMLElement;
  private disposeButton: HTMLElement;
  private windowResizeListener: () => void;
  private resizeText:HTMLElement;
  private helpText:HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
    // for generic app logic

    this.addButton = <HTMLElement>this.element.querySelector('.js-button-add');
    this.disposeButton = <HTMLElement>this.element.querySelector('.js-button-dispose');
    this.resizeText = <HTMLElement>this.element.querySelector('.js-resize-text');
    this.helpText = <HTMLElement>this.element.querySelector('.js-help-text');

    this.addEventListeners();
  }

  private addEventListeners() {
    this.addButton.addEventListener('click', this.handleAddButtonClick.bind(this));
    this.disposeButton.addEventListener('click', this.handleDisposeButtonClick.bind(this));
  }

  /**
   * @private
   * @method handleAddButtonClick
   */
  private handleAddButtonClick(): void {
    this.helpText.style.display = 'block';
    this.addButton.style.display = 'none';
    this.windowResizeListener = addEventListener(window, 'resize', this.handleWindowResize.bind(this));
  }

  /**
   * @private
   * @method handleWindowResize
   */
  private handleWindowResize(): void {
    this.resizeText.innerHTML = 'you are resizing';

    setTimeout(() => {
      this.resizeText.innerHTML = '';
    }, 100);
  }

  /**
   * @private
   * @method
   */
  private handleDisposeButtonClick(): void {
    this.helpText.style.display = 'none';
    this.addButton.style.display = 'inline-block';

    if (this.windowResizeListener) {
      this.windowResizeListener();
      this.windowResizeListener = null;
    }
  }
}
