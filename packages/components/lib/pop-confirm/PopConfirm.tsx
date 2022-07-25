import React, { EventHandler, useState } from "react";
import { Button, ButtonType } from "../button/Button";
import { Panel } from "../panel/Panel";
import { BlinkDot } from "../blink-dot/BlinkDot";

export type PopConfirmProps = {
  onOk?:
    | EventHandler<React.MouseEvent<HTMLButtonElement>>
    | (() => Promise<void>);
  onCancel?: EventHandler<React.MouseEvent<HTMLButtonElement>>;
  className?: string;
  content?: any;
  children?: any;
  width?: number;
};

export const PopConfirm = (props: PopConfirmProps) => {
  const [loading, setLoading] = useState(false);
  const { onOk, onCancel, children, content, className } = props;
  return (
    <Panel className={className}>
      <div className="mb-32">{children || content}</div>
      <div className="flex justify-end">
        {onCancel && (
          <Button onClick={onCancel} type={ButtonType.NORMAL}>
            Cancel
          </Button>
        )}
        {onOk && (
          <Button
            onClick={async (e) => {
              setLoading(true);
              await onOk(e);
              setLoading(false);
            }}
            className="ml-16 relative"
            type={loading ? ButtonType.DISABLED : ButtonType.PRIMARY}
          >
            OK
            {loading && <BlinkDot className="!absolute top-2 right-2" />}
          </Button>
        )}
      </div>
    </Panel>
  );
};
