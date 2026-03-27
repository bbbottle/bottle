import type { SlotName, HookPoint } from 'src/types/slots';

export interface ISlotEntry {
  id: string;
  component: React.ComponentType<any>;
  pluginId: string;
  weight: number;
}

export interface IMiddlewareEntry {
  id: string;
  fn: Function;
  pluginId: string;
  weight?: number;
}

export class Registry {
  private slots = new Map<SlotName, ISlotEntry[]>();

  private listeners = new Set<() => void>();

  private middlewares = new Map<HookPoint, IMiddlewareEntry[]>();

  private broadcastChange() {
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  registerComponent(slot: SlotName, component: React.ComponentType, pluginId: string, weight = 0) {
    const existing = this.slots.get(slot) || [];

    const newEntry: ISlotEntry = {
      id: `${pluginId}-${component.name || 'comp'}`,
      pluginId,
      component,
      weight,
    };

    // 插入并按权重排序（权重大的在前）
    const newList = [...existing, newEntry].sort((a, b) => b.weight - a.weight);
    this.slots.set(slot, newList);

    this.broadcastChange();
  }

  unregisterAllByPluginId(pluginId: string) {
    // 1. 清理 UI 槽位
    this.slots.forEach((entries, slotName) => {
      const filtered = entries.filter(entry => entry.pluginId !== pluginId);
      this.slots.set(slotName, filtered);
    });

    // 2. 清理中间件
    this.middlewares.forEach((entries, point) => {
      const filtered = entries.filter(entry => entry.pluginId !== pluginId);
      this.middlewares.set(point, filtered);
    });

    console.log(`[Registry] All resources for plugin "${pluginId}" have been cleared.`);

    this.broadcastChange();
  }

  registerMiddleware(hookPoint: HookPoint, fn: Function, pluginId: string, weight = 0) {
    const existing = this.middlewares.get(hookPoint) || [];

    const newEntry: IMiddlewareEntry = {
      id: `${pluginId}-${fn.name || 'middleware'}`,
      pluginId,
      fn,
      weight,
    };

    // 插入并按权重排序（权重大的在前）
    const newList = [...existing, newEntry].sort((a, b) => (b.weight || 0) - (a.weight || 0));
    this.middlewares.set(hookPoint, newList);
  }

  getComponents(slotName: SlotName): React.ComponentType<any>[] {
    return (this.slots.get(slotName) || []).map(entry => entry.component);
  }

  async runMiddleware<T>(point: HookPoint, data: T): Promise<T> {
    const fns = (this.middlewares.get(point) || []).map(entry => entry.fn);
    let result = data;
    for (const fn of fns) {
      result = await fn(result);
    }
    return result;
  }
}

export const registry = new Registry();
