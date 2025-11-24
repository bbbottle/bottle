import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { GlobalLoadingContext } from "@/context/global_loading_state_provider";
import { BlinkDot } from "@bbki.ng/components";
import { faces, hearts, ReactionEmojiPair, sadFaces } from "./emojis";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "open-heart": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          href?: string;
          emoji?: string;
          ariaDisabled?: boolean;
          onClick?: React.MouseEventHandler<HTMLElement>;
        },
        HTMLElement
      >;
    }
  }
}

const useHeartSent = (val: string) => {
  const [sent, setSent] = useState(false);
  const { setIsLoading } = useContext(GlobalLoadingContext);

  const handleSent = (evt: Event) => {
    const targetVal = (evt.target as HTMLElement).getAttribute("emoji");

    if (targetVal == val) setSent(true);
    setIsLoading(false);
  };

  useEffect(() => {
    addEventListener("open-heart", handleSent);

    return () => {
      removeEventListener("open-heart", handleSent);
    };
  }, []);

  return sent;
};

export const OpenHeartReaction = (props: {
  title: string;
  emojiPair: ReactionEmojiPair;
}) => {
  const { title, emojiPair = hearts } = props;
  const sent = useHeartSent(emojiPair.val);

  const { setIsLoading } = useContext(GlobalLoadingContext);

  const ohRef = useRef<HTMLElement>(null);

  const pressed = () => ohRef.current?.getAttribute("aria-pressed");

  const handleHeartClick = () => {
    if (sent || pressed()) {
      return;
    }

    setIsLoading(true);
  };

  return (
    <open-heart
      style={{
        display: "inline-flex",
        padding: 4,
        marginTop: "1rem",
        position: "relative",
      }}
      ref={ohRef}
      href={`https://oh.bbking.workers.dev/?id=${title}`}
      emoji={emojiPair.val}
      onClick={handleHeartClick}
    >
      {sent || pressed() ? emojiPair.on : emojiPair.off}
    </open-heart>
  );
};

export const Reaction = (props: { title: string }) => {
  return (
    <div>
      <OpenHeartReaction title={props.title} emojiPair={hearts} />
      <OpenHeartReaction title={props.title} emojiPair={faces} />
      <OpenHeartReaction title={props.title} emojiPair={sadFaces} />
    </div>
  );
};
