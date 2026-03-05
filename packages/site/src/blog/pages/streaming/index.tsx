import React, { useEffect, useRef, useState } from "react";
import { useStreaming, StreamingItem } from "@/hooks/use_streaming";
import { formatStreamingData } from "@/utils/streaming";
import { Article, Button, ButtonType, Panel } from "@bbki.ng/components";
import { useScrollBtnVisibility } from "./useScrollBtnVisibility";
import classNames from "classnames";

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

export interface BbMsgHistoryElement extends HTMLElement {
  setAuthor(name: string, config: { avatar: string; side: string; bubbleColor: string }): void;
  scrollToBottom(): void;
}

const Streaming = () => {
  const { streaming, isLoading, isError } = useStreaming();
  const bbMsgHistoryRef = useRef<BbMsgHistoryElement>(null);

  const showScrollBtn = useScrollBtnVisibility(bbMsgHistoryRef.current!);

  if (isError) {
    return <div className="p-8 text-center text-gray-500">加载失败</div>;
  }

  const formattedData = formatStreamingData(streaming || []);

  console.log("showScrollBtn", showScrollBtn);

  return (
    <Article title="直播" loading={isLoading}>
      {isLoading ? null : (
          <>
            <Panel className="!p-[10px]">
              <bb-msg-history
                // infinite
                hide-scroll-bar
                hide-scroll-button
                ref={bbMsgHistoryRef}
                style={{ height: "100%", "--bb-max-height": "200px" } as React.CSSProperties}
              >
                {formattedData}
              </bb-msg-history>
            </Panel>
            <Button
              className="mt-128"
              transparent={!showScrollBtn}
              onClick={() => {
                bbMsgHistoryRef.current?.scrollToBottom();
              }}>

          <svg
            data-testid="geist-icon"
            height="16"
            stroke-linejoin="round"
            viewBox="0 0 16 16"
            width="16"
            style={{
              rotate: '180deg'
            }}
            className={classNames("transition-opacity duration-300 inline-block", {
              "opacity-0": !showScrollBtn,
              "opacity-100": showScrollBtn,
            })}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.70711 1.39644C8.31659 1.00592 7.68342 1.00592 7.2929 1.39644L2.21968 6.46966L1.68935 6.99999L2.75001 8.06065L3.28034 7.53032L7.25001 3.56065V14.25V15H8.75001V14.25V3.56065L12.7197 7.53032L13.25 8.06065L14.3107 6.99999L13.7803 6.46966L8.70711 1.39644Z"
              fill="currentColor"
            ></path>
          </svg>
            </Button>
          </>
      )}
    </Article>
  );
};

export default Streaming;
