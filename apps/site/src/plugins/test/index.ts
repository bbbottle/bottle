import { IHostContext } from '#/types/hostApi';
import { IPlugin } from '#/types/plugin';
import { Emoji } from './components/emoji';

class TestPlugin implements IPlugin {
  id: string = 'test';
  name: string = 'Test Plugin';
  description?: string | undefined;
  version: string = '0.1.0';
  author?: string | undefined;

  onInstall?: ((ctx: IHostContext) => void) | undefined = (ctx: IHostContext) => {
    ctx.api.registerSlot('leftCol', Emoji, this.id);
  };

  onDisable?: (() => Promise<void> | void) | undefined;
  onDestroy?: (() => void) | undefined;
}

const testPlugin = new TestPlugin();

export default testPlugin;
