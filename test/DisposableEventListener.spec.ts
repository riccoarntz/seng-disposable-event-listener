import {use, expect} from 'chai';
import {spy} from 'sinon';
import {DisposableEventListener} from '../src';
import sinonChai from 'sinon-chai';
import EventDispatcher, {AbstractEvent} from "seng-event";
use(sinonChai);

describe('DisposableEventListener', () => {
  it('handler should be removed after disposing DisposableEventListener', () => {

    const div = document.createElement('div');
    const handler = spy();

    const disposableEventListener = new DisposableEventListener(div, 'type', handler);

    div.dispatchEvent(new Event('type'));
    disposableEventListener.dispose();
    div.dispatchEvent(new Event('type'));

    expect(handler).calledOnce;
    expect(disposableEventListener.isDisposed()).to.equal(true)
  });
});


describe('seng-event compatibility', () => {
  it('should be possible to use the EventDispatcher from seng-event with DisposableEventListener', () => {

    class BasicEvent extends AbstractEvent {
      public clone(): BasicEvent {
        return new BasicEvent(this.type, this.bubbles, this.cancelable, this.timeStamp !== 0);
      }
    }

    const eventDispatcher = new EventDispatcher();
    const handler = spy();

    const disposableEventListener = new DisposableEventListener(eventDispatcher, 'type', handler);

    eventDispatcher.dispatchEvent(new BasicEvent('type'));
    disposableEventListener.dispose();
    eventDispatcher.dispatchEvent(new BasicEvent('type'));

    expect(handler).calledOnce;
    expect(disposableEventListener.isDisposed()).to.equal(true)
  });
});
