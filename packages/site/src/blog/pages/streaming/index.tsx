import React, { useEffect, useRef } from "react";
import { useStreaming, StreamingItem } from "@/hooks/use_streaming";
import { formatStreamingData } from "@/utils/streaming";
import { Article } from "@bbki.ng/components";
import { GitHubAvatar } from "@/constants/stream_avatar";

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
    if (bbMsgHistoryRef.current) {
      bbMsgHistoryRef.current.setAuthor('GitHub', { avatar: GitHubAvatar, side: 'left', bubbleColor: '#f5f5f5' });
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
        ref={bbMsgHistoryRef}
        style={{ "height": "100%" }}
      >
        {formattedData}
      </bb-msg-history>
    </div>
  );
};

export default Streaming;
