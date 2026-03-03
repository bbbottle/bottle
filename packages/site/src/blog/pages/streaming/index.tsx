import React, { useEffect, useRef, useState } from "react";
import { useStreaming, StreamingItem } from "@/hooks/use_streaming";
import { formatStreamingData } from "@/utils/streaming";

// Extend JSX IntrinsicElements for the web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "bb-msg-history": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        BbMsgHistoryElement
      > & {
        loading?: boolean;
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
    $blog.style.overflow = "hidden";

    return () => {
      $blog.style.overflow = "auto";
    }
  }, [])

  if (isError) {
    return <div className="p-8 text-center text-gray-500">加载失败</div>;
  }

  const formattedData = formatStreamingData(streaming || []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="h-full w-full p-4">
      <bb-msg-history
        hide-scroll-bar
        ref={bbMsgHistoryRef}
        style={{ "height": "100%" }}
      >
        {formattedData}
      </bb-msg-history>
    </div>
  );
};

export default Streaming;
