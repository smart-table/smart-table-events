export interface Emitter {
    on(event: string, ...listeners: Function[]): Emitter;

    dispatch(event: string, ...args: any[]);

    off(event: string, ...listeners: Function[]);
}

export const emitter = (): Emitter => {
    const listenersLists = {};
    const instance = {
        on(event: string, ...listeners: Function[]) {
            listenersLists[event] = (listenersLists[event] || []).concat(listeners);
            return instance;
        },
        dispatch(event: string, ...args: any[]) {
            const listeners = listenersLists[event] || [];
            for (const listener of listeners) {
                listener(...args);
            }
            return instance;
        },
        off(event: string, ...listeners: Function[]) {
            if (event === undefined) {
                Object.keys(listenersLists).forEach(ev => instance.off(ev));
            } else {
                const list = listenersLists[event] || [];
                listenersLists[event] = listeners.length ? list.filter(listener => !listeners.includes(listener)) : [];
            }
            return instance;
        }
    };
    return instance;
};

interface EventMap {
    [key: string]: string;
}

export interface ProxyEmitter {
    off(ev: string): ProxyEmitter;
}

export const proxyListener = (eventMap: EventMap) => ({emitter}: { emitter: Emitter }): ProxyEmitter => {
    const eventListeners = {};
    const proxy: ProxyEmitter = {
        off(ev) {
            if (!ev) {
                Object.keys(eventListeners).forEach(eventName => proxy.off(eventName));
            }
            if (eventListeners[ev]) {
                emitter.off(ev, ...eventListeners[ev]);
            }
            return proxy;
        }
    };

    for (const ev of Object.keys(eventMap)) {
        const method = eventMap[ev];
        eventListeners[ev] = [];
        proxy[method] = function (...listeners) {
            eventListeners[ev] = eventListeners[ev].concat(listeners);
            emitter.on(ev, ...listeners);
            return proxy;
        };
    }

    return proxy;
};
