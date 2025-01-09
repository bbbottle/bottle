import React, { useRef } from "react"
import { PluginDrawer } from "./PluginDrawer"

export type PluginUIProps = {
    title: string,
    html: string,
}

export const PluginUI = (props: PluginUIProps) => {
    return (
        <PluginDrawer
            title="test"
        >
            <iframe
                srcDoc={props.html}
            />
        </PluginDrawer>
    )
}