import {use, expect} from 'chai';
import {spy} from 'sinon';
import {addEventListener} from '../src';
import sinonChai from 'sinon-chai';
import EventDispatcher, {AbstractEvent} from "seng-event";
use(sinonChai);

describe('DisposableEventListener', () => {
  it('handler should be removed after disposing DisposableEventListener', () => {

    const div = document.createElement('div');
    const handler = spy();

    const disposableEventListener = addEventListener(div, 'type', handler);

    div.dispatchEvent(new Event('type'));
    disposableEventListener();
    div.dispatchEvent(new Event('type'));

    expect(handler).calledOnce;
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

    const disposableEventListener = addEventListener(eventDispatcher, 'type', handler);

    eventDispatcher.dispatchEvent(new BasicEvent('type'));
    disposableEventListener();
    eventDispatcher.dispatchEvent(new BasicEvent('type'));

    expect(handler).calledOnce;
  });
});
