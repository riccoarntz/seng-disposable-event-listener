import {use, expect} from 'chai';
import {spy} from 'sinon';
import {DisposableEventListener} from '../src';
import sinonChai from 'sinon-chai';
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
