export enum PluginEvent {
  INIT = "init",
  INSTALL = "installed",
  UNINSTALL = "uninstalled",
}

export class PluginEventMgr {
  private static listeners: Map<PluginEvent, EventListener[]> = new Map();

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

    PluginEventMgr.listeners.get(evt)?.push(listener);

    window.addEventListener(evt, listener);
  }

  public static removeEventListener<T>(evt: PluginEvent, cb: (data: T) => void) {
    const listeners = PluginEventMgr.listeners.get(evt);
    if (!listeners) {
      return;
    }

    const targetListener = listeners.find((l) => l === cb);
    if (!targetListener) {
      return;
    }

    window.removeEventListener(evt, targetListener);
  }
}