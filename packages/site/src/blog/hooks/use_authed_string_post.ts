import {useSWRConfig} from "swr";
import {useAuthed} from "@/hooks/use_authed";
import {useContext} from "react";
import {GlobalLoadingContext} from "@/context/global_loading_state_provider";
import {usePost} from "@/hooks/use_post";
import {splitPost} from "@/utils";
import {API} from "@/constants/routes";

export const useAuthedStringPost = () => {
    const { mutate } = useSWRConfig();

    const isKing = useAuthed();

    const { setIsLoading } = useContext(GlobalLoadingContext);

    const post = usePost();

    return (content: string) => {
        if (!content) {
            return;
        }

        if (!isKing) {
            return;
        }

        const postObj = splitPost(content);
        if (!postObj?.content || !postObj?.title) {
            return;
        }

        setIsLoading(true);

        post(postObj.title, postObj.content)
            .then((r) => {
                mutate(API.POSTS).then();
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
}