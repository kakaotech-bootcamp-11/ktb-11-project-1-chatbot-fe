import useInitialDataStore from "@/store/initialDataStore";
import useSkeletonStore from "@/store/skeletonStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AIResponse, CreatedChat } from "./useSendChatStreamMutation";

export function useCreateNewChatStreamMutationLegacy() {
  const queryClient = useQueryClient();
  const { setIsChatLoading } = useSkeletonStore((state) => state);
  const { setInitialData, addInitialData } = useInitialDataStore(
    (state) => state
  );

  return useMutation({
    mutationKey: ["createNewStreamChat"],
    mutationFn: async (content: string): Promise<CreatedChat> => {
      setIsChatLoading(true);

      // 유저 메세지
      addInitialData({
        chatMessageId: 0,
        content,
        isUser: true,
      });

      // AI 메세지
      addInitialData({
        chatMessageId: 1,
        content: "",
        isUser: false,
      });

      const response = await fetch(
        // "/api/gpt",
        `${process.env.NEXT_PUBLIC_API_URL}/chats/me/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ content }),
          // body: JSON.stringify({ prompt: content }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch AI response.");
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;

      let aiResponse: AIResponse = {
        chatMessageId: Date.now(), // Temporary ID for AI response
        content: "",
        isUser: false,
      };

      while (!done) {
        const { value, done: streamDone } = (await reader?.read()) ?? {};
        done = streamDone;

        const chunk = decoder.decode(value);
        // console.log(chunk);
        if (chunk.trim() !== "") {
          const jsonChunks = chunk
            .split("\n\n")
            .filter((c) => c.startsWith("data: "));

          for (const jsonChunk of jsonChunks) {
            const jsonStr = jsonChunk.replace("data: ", "");
            if (jsonStr === "[DONE]") {
              done = true;
              break;
            }

            try {
              const json = JSON.parse(jsonStr);
              const content = json.choices?.[0]?.delta?.content;
              if (content) {
                aiResponse.content += content;

                // Update local state (initial data store) as the response streams in
                setInitialData(1, {
                  ...aiResponse,
                });
              }
            } catch (error) {
              console.error("Failed to parse chunk:", error);
            }
          }
        }
      }

      // Simulate creating a new chat and return the chatId
      // In a real scenario, this would be an API call to create the chat and get the chatId
      const createdChat: CreatedChat = {
        chatId: Date.now(), // Simulating a new chatId
        aiResponse: aiResponse,
      };

      return createdChat;
    },
    onSuccess: async (data, variables, context) => {
      // console.log(data);
      // Invalidate and refetch any related queries
      await queryClient.invalidateQueries({
        queryKey: ["titles"],
      });

      // router.replace(`/chat/${data.chatId}`);

      // resetInitialData();

      // setIsChatLoading(false);
    },
    onError: (error, variables, context) => {
      toast.error("잘못된 요청입니다.");
      setIsChatLoading(false);
    },
  });
}
