import test from 'zora';
import {emitter, proxyListener} from '../dist/bundle/module';

test('register a listener to an event', t => {
    let counter = 0;
    const listener = (increment) => {
        counter += increment;
    };
    const em = emitter();
    em.on('foo', listener);
    em.dispatch('foo', 3);
    t.equal(counter, 3);
});
test('multiple listeners registered at once', t => {
    let counter = 0;
    const firstListener = inc => {
        counter += inc;
    };
    const secondListener = inc => {
        counter += inc * 2;
    };
    const em = emitter();
    em.on('foo', firstListener, secondListener);
    em.dispatch('foo', 3);
    t.equal(counter, 9);
});
test('multiple listeners registered separately', t => {
    let counter = 0;
    const firstListener = inc => {
        counter += inc;
    };
    const secondListener = inc => {
        counter += inc * 2;
    };
    const em = emitter();
    em.on('foo', firstListener)
        .on('foo', secondListener);
    em.dispatch('foo', 3);
    t.equal(counter, 9);
});
test('unregister specific listener', t => {
    let counter = 0;
    const firstListener = inc => {
        counter += inc;
    };
    const secondListener = inc => {
        counter += inc * 2;
    };
    const em = emitter();
    em.on('foo', firstListener, secondListener);
    em.off('foo', secondListener);
    em.dispatch('foo', 3);
    t.equal(counter, 3);
});
test('unregister all listeners of a given type', t => {
    let counter = 0;
    const firstListener = inc => {
        counter += inc;
    };
    const secondListener = inc => {
        counter += inc * 2;
    };
    const thirdListener = inc => {
        counter -= inc;
    };
    const em = emitter();
    em.on('foo', firstListener, secondListener);
    em.on('bar', thirdListener);
    em.off('foo');
    em.dispatch('foo', 3);
    t.equal(counter, 0);
    em.dispatch('bar', 200);
    t.equal(counter, -200);
});
test('unregister all listeners', t => {
    let counter = 0;
    const firstListener = inc => {
        counter += inc;
    };
    const secondListener = inc => {
        counter -= inc;
    };
    const em = emitter();
    em.on('foo', firstListener);
    em.on('bar', secondListener);
    em.off();
    em.dispatch('foo', 3);
    t.equal(counter, 0);
    em.dispatch('bar', 200);
    t.equal(counter, 0);
});
test('proxy: map event listeners to methods', t => {
    let counter = 0;
    const em = emitter();
    const firstListener = inc => {
        counter += inc;
    };
    const secondListener = inc => {
        counter += inc * 2;
    };
    const lstner = proxyListener({foo: 'onFoo', bar: 'onBar'})({emitter: em});
    lstner.onFoo(firstListener);
    lstner.onBar(secondListener);
    em.dispatch('foo', 2);
    em.dispatch('bar', 6);
    t.equal(counter, 14);
});
test('proxy: unregister event listeners on a specific event', t => {
    let counter = 0;
    const em = emitter();
    const firstListener = inc => {
        counter += inc;
    };
    const secondListener = inc => {
        counter += inc * 2;
    };
    const lstner = proxyListener({foo: 'onFoo'})({emitter: em});
    lstner.onFoo(firstListener);
    lstner.onFoo(secondListener);
    em.dispatch('foo', 2);
    t.equal(counter, 6);
    lstner.off('foo');
    em.dispatch('foo', 2);
    t.equal(counter, 6);
});
test('proxy: unregister all event listeners', t => {
    let counter = 0;
    const em = emitter();
    const firstListener = inc => {
        counter += inc;
    };
    const secondListener = inc => {
        counter += inc * 2;
    };
    const lstner = proxyListener({foo: 'onFoo', bar: 'onBar'})({emitter: em});
    lstner.onFoo(firstListener);
    lstner.onBar(secondListener);
    em.dispatch('foo', 2);
    em.dispatch('bar', 6);
    t.equal(counter, 14);
    lstner.off();
    em.dispatch('foo', 2);
    em.dispatch('bar', 6);
    t.equal(counter, 14);
});
