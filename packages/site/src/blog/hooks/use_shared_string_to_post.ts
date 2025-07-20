import {useEffect} from "react";
import {useAuthedStringPost} from "@/hooks/use_authed_string_post";

export const useSharedStringToPost = () => {
    const post = useAuthedStringPost();

    useEffect(() => {
        const handleSharedString = (event: MessageEvent) => {
            if (event.data && typeof event.data === "string") {
                const content = event.data;
                if (content) {
                    post(content);
                }
            }
        }

        window.addEventListener("message", handleSharedString);

        return () => {
            window.removeEventListener("message", handleSharedString);
        }
    }, []);
}