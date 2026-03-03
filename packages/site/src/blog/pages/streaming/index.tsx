import React, { useEffect, useRef, useState } from "react";
import { useStreaming, StreamingItem } from "@/hooks/use_streaming";
import { formatStreamingData } from "@/utils/streaming";
import { Article, Panel } from "@bbki.ng/components";

// Extend JSX IntrinsicElements for the web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "bb-msg-history": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        BbMsgHistoryElement
      > & {
        loading?: boolean;
        infinite?: boolean;
      };
    }
  }
}

interface BbMsgHistoryElement extends HTMLElement {
  setAuthor(name: string, config: { avatar: string; side: string; bubbleColor: string }): void;
}

const Streaming = () => {
  const { streaming, isLoading, isError } = useStreaming();
  const bbMsgHistoryRef = useRef<BbMsgHistoryElement>(null);

  useEffect(() => {
    const $blog = document.querySelector("#blog") as HTMLDivElement | null;
    if (!$blog) return;

    // disable scroll
    // $blog.style.overflow = "hidden";

    // return () => {
    //   $blog.style.overflow = "auto";
    // }
  }, [])

  if (isError) {
    return <div className="p-8 text-center text-gray-500">加载失败</div>;
  }

  const formattedData = formatStreamingData(streaming || []);

  if (isLoading) {
    return null;
  }

  return (
    <Article title="直播">
      <Panel className="!p-[10px]">
        <bb-msg-history
          // infinite
          hide-scroll-bar
          ref={bbMsgHistoryRef}
          style={{ height: "100%", "--bb-max-height": "200px" } as React.CSSProperties}
        >
          {formattedData}
        </bb-msg-history>
      </Panel>
    </Article>
  );
};

export default Streaming;
