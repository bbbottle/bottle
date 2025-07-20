import React from "react";

export const useClipboardContent = () => {
    const [clipboardContent, setClipboardContent] = React.useState<string | null>(null);

    React.useEffect(() => {
        const handlePaste = (event: ClipboardEvent) => {

            if (event.clipboardData) {
                setClipboardContent(event.clipboardData.getData("text/plain"));
            }
        };

        document.addEventListener("paste", handlePaste);

        return () => {
            document.removeEventListener("paste", handlePaste);
        };
    }, []);

    console.log(clipboardContent);

    return clipboardContent;
}