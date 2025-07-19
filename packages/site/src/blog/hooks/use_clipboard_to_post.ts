import {useClipboardContent} from "@/hooks/use_clipboard_content";
import {useSWRConfig} from "swr";
import {useContext, useEffect} from "react";
import {GlobalLoadingContext} from "@/context/global_loading_state_provider";
import {usePost} from "@/hooks/use_post";
import {API} from "@/constants/routes";
import {useAuthed} from "@/hooks/use_authed";

export const useClipboardToPost = () => {
    const clipboardContent = useClipboardContent();

    const { mutate } = useSWRConfig();

    const { setIsLoading } = useContext(GlobalLoadingContext);

    const post = usePost();

    const firstLine = clipboardContent ? clipboardContent.split("\n")[0] : "";
    const title = firstLine ? firstLine.trim() : "";

    const restContent = clipboardContent ? clipboardContent.slice(title.length).trim() : "";

    const isKing = useAuthed();

    useEffect(() => {
        if (!isKing || !restContent || !title) {
            return;
        }

        setIsLoading(true);

        post(title, restContent)
            .then((r) => {
                mutate(API.POSTS).then();
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [title, restContent]);

    return null;
}