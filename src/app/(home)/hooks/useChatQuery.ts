import {useQuery} from "@tanstack/react-query";

export interface ChatTitle {
    id: number;
    title: String;
}

const fetchChatTitles = async (): Promise<ChatTitle[]> => {
    const response = await fetch(`http://localhost:8080/api/chats`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: ChatTitle[] = await response.json();
    return data || [];
}

export const useChatTileListQuery = () => {
    return useQuery<ChatTitle[]>({
        queryKey: ["getTitles"],
        queryFn: () => fetchChatTitles(),
        select: (data) => data ?? [],
    });
};