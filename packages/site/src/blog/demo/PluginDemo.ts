import createPlugin from "@extism/extism";
import { CurrentPlugin } from "@extism/extism";
import { toast } from "sonner";

const plugin = await createPlugin("http://localhost:5173/demo.wasm", {
  useWasi: true,
  functions: {
    "extism:host/user": {
      toast: (cp: CurrentPlugin, offs: bigint) => {
        const content = cp.read(offs).text();
        toast.success(content, {
          position: "bottom-right",
        });
      },
    },
  },
});

export const testPlugin = async () => {
  const input = "bbki.ng";
  let out = await plugin.call("greet", input);
  console.log(out.text());
  return out.text();
};
