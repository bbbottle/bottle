import { useNavigate } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";
import { GITHUB_REPO_ADDRESS, ROUTES } from "@/constants";

enum HotKeys {
  i = "i",
  e = "e",
  c = "c",
  t = "t",
  p = "p",
  a = "a",
  f = "f",
  b = "b",
  h = "h",
  s = "s",
  l = "l",
  T = "shift+t",
}

const KEY_ROUTES = [
  { key: HotKeys.i, route: ROUTES.INDEX },
  { key: HotKeys.c, route: ROUTES.CONTENT },
  { key: HotKeys.h, route: ROUTES.HELP },
  { key: HotKeys.t, route: ROUTES.TAGS },
  { key: HotKeys.l, route: ROUTES.LOGIN },
];

export const HotKeyNav = (props: any) => {
  const nav = useNavigate();
  const goto = (path: string) => {
    nav(path);
  };

  useHotkeys(HotKeys.b, () => {
    nav(-1);
  });
  useHotkeys(HotKeys.f, () => {
    nav(1);
  });
  useHotkeys(HotKeys.s, () => {
    window.open(GITHUB_REPO_ADDRESS);
  });

  KEY_ROUTES.map(({ key, route }) => {
    useHotkeys(key, () => {
      goto(route);
    });
  });

  return props.children;
};
