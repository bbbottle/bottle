import React, { useRef, useImperativeHandle, forwardRef } from "react"
import { PluginDrawer } from "../PluginDrawer"

export type PluginUIProps = {
    html?: string,
}

const PluginUI = (props: PluginUIProps, ref: React.ForwardedRef<{ setHtml: (html: string) => void }>) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [open, setOpen] = React.useState(false);
    const [html, setHtml] = React.useState(props.html);

    useImperativeHandle(ref, () => ({
        setHtml: (h) => {
            setHtml(h);
            setOpen(true);
        },
    }), []);

    return (
        <PluginDrawer
            open={open}
            onOpenChange={setOpen}
        >
            <iframe
                sandbox="allow-scripts allow-same-origin"
                ref={iframeRef}
                srcDoc={html}
            />
        </PluginDrawer>
    )
}

export default forwardRef(PluginUI)