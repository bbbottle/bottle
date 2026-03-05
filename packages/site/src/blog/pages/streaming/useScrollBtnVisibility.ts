import { useEffect, useState } from "react";
import { BbMsgHistoryElement } from ".";

export const useScrollBtnVisibility = (ele: BbMsgHistoryElement) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!ele) {
            return;
        }

        const handleShow = () => setVisible(true);
        const handleHide = () => setVisible(false);

        ele.addEventListener("bb-scrollbuttonshow", handleShow);
        ele.addEventListener("bb-scrollbuttonhide", handleHide);

        console.log("add event listeners");

        return () => {
            ele.removeEventListener("bb-scrollbuttonshow", handleShow);
            ele.removeEventListener("bb-scrollbuttonhide", handleHide);
        };
    }, [ele])

    return visible;
}