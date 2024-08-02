import {useMutation, useQuery} from "@tanstack/react-query";

export interface ChatTitle {
    id: number;
    title: String;
}

export interface ChatContent {
    isUser: boolean;
    chatMessageId: number;
    content: string;
}

const fetchChatTitles = async (): Promise<ChatTitle[]> => {
    const response = await fetch(`http://localhost:8080/chats/me/titles`,{
        method: 'GET',
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: ChatTitle[] = await response.json();
    return data || [];
}

const getChatHistory = async (chatId: number) => {
    const response = await fetch(`http://localhost:8080/chats/me/${chatId}`, {
        method: 'GET',
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const useChatTileListQuery = () => {
    return useQuery<ChatTitle[]>({
        queryKey: ["getTitles"],
        queryFn: () => fetchChatTitles(),
        select: (data) => data ?? [],
    });
};

export const useChatHistoryQuery = (chatId: number) => {
    return useQuery<ChatContent[]>({
        queryKey: ["chatHistory", chatId],
        // queryKey: ["chatMessages", chatId],
        queryFn: () => getChatHistory(chatId),
        enabled: !!chatId
    });
};

export const sendChatMessage = async ( chatId: number, message: string ) => {
    const response = await fetch(`http://localhost:8080/chats/me/${chatId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ content: message }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export interface createdChat {
    "chatId": number;
    "aiResponse": aiResponse;
}

export interface aiResponse {
    chatMessageId: number;
    content: string;
    isUser: boolean;
}


export const createNewChat = async (content: string) : Promise<createdChat>  => {
    const response = await fetch(`http://localhost:8080/chats/me/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            content: content,
        })
    })

    return response.json();
}

export const deleteChat = async (chatId: string) => {
    const response = await fetch(`http://localhost:8080/chats/me/${chatId}`, {
        method: 'DELETE',
        credentials: 'include',
    })
}


