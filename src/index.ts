import { fromEvent, Observable, Subscription, Subject } from 'rxjs';

class Controller {

  container :HTMLElement | null;
  location :HTMLElement | null;

  mouseDown :Observable<Event> = null;
  mouseUp :Observable<Event> = null;
  pressObservable :Observable<Event> = null;
  moveObservable :Observable<MouseEvent> = null;

  moveSubscription :Subscription;

  currentLocation :Subject<{ x?: number, y?: number}> = new Subject();

  constructor() {
    this.init();
  }

  init() {
    this.container = document.getElementById('container');
    this.location = document.getElementById('location');

    this.mouseDown = fromEvent(this.container, 'mousedown');
    this.mouseUp = fromEvent(this.container, 'mouseup');
    this.moveObservable = <Observable<MouseEvent>> fromEvent(this.container, 'mousemove');

    this.mouseDown.subscribe(event => {
      this.moveSubscription = this.moveObservable.subscribe(({ clientX, clientY }) => {
        this.currentLocation.next({ x: clientX, y: clientY });
      });
    });

    this.mouseUp.subscribe(event => this.moveSubscription.unsubscribe());

    this.currentLocation.subscribe( ({ x, y }) => this.location.innerHTML = `x: ${x} | y: ${y}`)
  }
}

const controller = new Controller();