import {use, expect} from 'chai';
import {spy} from 'sinon';
import {addEventListener} from '../src';
import sinonChai from 'sinon-chai';
import EventDispatcher, {AbstractEvent} from "seng-event";
use(sinonChai);

describe('addEventListener', () => {
  it('handler should be removed after disposing the listener', () => {

    const div = document.createElement('div');
    const handler = spy();

    const listener = addEventListener(div, 'type', handler);

    div.dispatchEvent(new Event('type'));
    listener();
    div.dispatchEvent(new Event('type'));

    expect(handler).calledOnce;
  });
});


describe('seng-event compatibility', () => {
  it('should be possible to use the EventDispatcher from seng-event with addEventListener', () => {

    class BasicEvent extends AbstractEvent {
      public clone(): BasicEvent {
        return new BasicEvent(this.type, this.bubbles, this.cancelable, this.timeStamp !== 0);
      }
    }

    const eventDispatcher = new EventDispatcher();
    const handler = spy();

    const listener = addEventListener(eventDispatcher, 'type', handler);

    eventDispatcher.dispatchEvent(new BasicEvent('type'));
    listener();
    eventDispatcher.dispatchEvent(new BasicEvent('type'));

    expect(handler).calledOnce;
  });
});
