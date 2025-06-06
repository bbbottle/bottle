import React from "react";
import { LinkList } from "@bbki.ng/components";
import { BlurCover } from "@bbki.ng/components";
import { DelayFadeIn } from "@/components/DelayFadeIn/DelayFadeIn";

export { DisabledText, SmallDisabledText } from "./disabled_text";

export { ImgList } from "./img_list";

export { withArticleWrapper } from "./with_wrapper";

export { HotKeyNav } from "./hotkey_nav";

export { VideoPlayer } from "./video_player";

export { ProgressBar } from "./progress_bar";

export { BlurCover } from "./blur_cover";

export { ReloadPrompt } from "./reload_prompt";

export { Stickers } from "./stickers";

export { CornerPromptBox } from "./corner_prompt_box";

export { Tags } from "./tags";

export { Comment } from "./comment";

export { MySuspense } from "./my_suspense";

export const CenterLinkList = (props: any) => {
  return (
    <div className="flex justify-center relative p-16">
      <LinkList {...props} />
      <BlurCover status={props.loading ? "show" : "silent"} />
    </div>
  );
};
