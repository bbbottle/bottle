import React, { useEffect, useRef, useState } from 'react';
import { useStreaming, StreamingItem } from '@/hooks/use_streaming';
import { formatStreamingData } from '@/utils/streaming';
import { Button, Panel } from '@bbki.ng/ui';
import { useScrollBtnVisibility } from './useScrollBtnVisibility';
import { Link } from '@bbki.ng/ui';
import { ArrowDownIcon } from './arrow-down';
import classNames from 'classnames';

// Extend JSX IntrinsicElements for the web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'bb-msg-history': React.DetailedHTMLProps<
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

  const [scrolled, setScrolled] = useState(false);

  const showScrollBtn = useScrollBtnVisibility(bbMsgHistoryRef.current!);

  const formattedData = formatStreamingData(streaming || []);

  useEffect(() => {
    const el = bbMsgHistoryRef.current;
    let timer: NodeJS.Timeout;
    if (!isLoading && el) {
      // 检查自定义元素是否已定义并升级
      if (el.scrollToBottom) {
        requestAnimationFrame(() => {
          el.scrollToBottom();
        });
      } else {
        // 等待 custom element 定义完成
        customElements.whenDefined('bb-msg-history').then(() => {
          el.scrollToBottom?.();
        });
      }

      // delay to set scrolled state after scrollToBottom
      timer = setTimeout(() => {
        setScrolled(true);
      }, 500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isLoading, formattedData]);

  if (isLoading || isError) {
    return null;
  }

  return (
    <>
      <Panel className="p-2.5! mt-16">
        <bb-msg-history
          // infinite
          hide-scroll-bar
          hide-scroll-button
          ref={bbMsgHistoryRef}
          style={{ height: '100%', '--bb-max-height': '260px' } as React.CSSProperties}
        >
          {formattedData}
        </bb-msg-history>
      </Panel>
      <Link
        className={classNames('w-fit relative opacity-0 transition-all duration-300 mt-16', {
          'opacity-100': scrolled,
          'opacity-0': showScrollBtn,
          'pointer-events-none': showScrollBtn || !scrolled,
        })}
        to="/"
        style={{ left: -4 }}
      >
        cd ..
      </Link>
    </>
  );
};

export default Streaming;
