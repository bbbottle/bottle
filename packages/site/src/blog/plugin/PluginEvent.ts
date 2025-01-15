export enum PluginEvent {
  INIT = "init",
  INSTALL = "installed",
  UNINSTALL = "uninstalled",
}

type EventHandler<T> = (data: T) => void;

type HandlerListenerPair = {
  handler: EventHandler<any>;
  listener: EventListener;
}

export class PluginEventMgr {
  private static listeners: Map<PluginEvent, HandlerListenerPair[]> = new Map();

  public static dispatchEvent<T>(evt: PluginEvent, data: T) {
    window.dispatchEvent(new CustomEvent(evt, { detail: data }));
  }

  public static addEventListener<T>(evt: PluginEvent, cb: (data: T) => void) {
    const listener = (e: any) => {
      cb((e as CustomEvent<T>).detail);
    }

    if (!PluginEventMgr.listeners.has(evt)) {
      PluginEventMgr.listeners.set(evt, []);
    }

    PluginEventMgr.listeners.get(evt)?.push({ handler: cb, listener });

    window.addEventListener(evt, listener);
  }

  public static removeEventListener<T>(evt: PluginEvent, cb: (data: T) => void) {
    const listeners = PluginEventMgr.listeners.get(evt);
    if (!listeners) {
      return;
    }

    const targetPair = listeners.find((l) => l.handler === cb);
    if (!targetPair) {
      return;
    }

    window.removeEventListener(evt, targetPair.listener);
  }
}