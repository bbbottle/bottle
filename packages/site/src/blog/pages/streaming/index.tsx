import React, { useEffect, useRef } from "react";
import { useStreaming, StreamingItem } from "@/hooks/use_streaming";
import { formatStreamingData } from "@/utils/streaming";

// Extend JSX IntrinsicElements for the web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "bb-msg-history": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const Streaming = () => {
  const { streaming, isLoading, isError } = useStreaming();
  const bbMsgHistoryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (bbMsgHistoryRef.current && streaming && streaming.length > 0) {
      const el = bbMsgHistoryRef.current as any;
      // Set author configurations for styling
      // Group by unique authors
      const authors = [...new Set(streaming.map((s: StreamingItem) => s.author))];
      authors.forEach((author, index) => {
        // Alternate sides for different authors
        const side = index % 2 === 0 ? "left" : "right";
        el.setAuthor(author, { side });
      });
    }
  }, [streaming]);

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <div className="p-8 text-center text-gray-500">加载失败</div>;
  }

  const formattedData = formatStreamingData(streaming || []);

  return (
    <div className="h-full w-full p-4">
      <bb-msg-history
        ref={bbMsgHistoryRef}
        style={{ height: "calc(100vh - 200px)", display: "block" }}
      >
        {formattedData}
      </bb-msg-history>
    </div>
  );
};

export default Streaming;
