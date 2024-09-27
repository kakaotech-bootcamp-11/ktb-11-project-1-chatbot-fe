import useInitialDataStore from "@/store/initialDataStore";
import useSkeletonStore from "@/store/skeletonStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AIResponse } from "./useSendChatStreamMutation";

export function useCreateNewChatStreamMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isChatLoading, setIsChatLoading } = useSkeletonStore(
    (state) => state
  );
  const { setInitialData, resetInitialData, addInitialData } =
    useInitialDataStore((state) => state);

  return useMutation({
    mutationKey: ["createNewStreamChat"],
    mutationFn: async (content: string): Promise<any> => {
      // 유저 메세지 추가
      addInitialData({
        chatMessageId: 0,
        content,
        isUser: true,
      });

      // AI 메세지 준비
      addInitialData({
        chatMessageId: 1,
        content: "",
        isUser: false,
      });

      let chatId;
      // let title;

      try {
        setIsChatLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chats/me/new`,
          // "/api/messages",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ content }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch AI response.");
        }

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let done = false;

        let aiResponse: AIResponse = {
          chatMessageId: Date.now(),
          content: "",
          isUser: false,
        };

        while (!done) {
          const { value, done: streamDone } = await reader.read();
          done = streamDone;

          buffer += decoder.decode(value || new Uint8Array(), {
            stream: !done,
          });
          console.log(buffer);

          let lines = buffer.split("\n");

          for (let i = 0; i < lines.length - 1; i++) {
            const jsonStr = lines[i].replace("data:", "").trim();
            if (jsonStr) {
              try {
                const aiJson = JSON.parse(jsonStr);
                const {
                  type,
                  chatId: rchatId,
                  content,
                  chatMessageType,
                  title: rtitle,
                } = aiJson.aiResponse;
                if (rchatId && rchatId) {
                  chatId = rchatId;
                }

                if (type === "DONE") {
                  done = true;
                  break;
                }
                // if (chatMessageType === "TITLE") {
                //   title = rtitle;
                // }
                if (!content) {
                  break;
                }
                aiResponse.content += content;

                setInitialData(1, {
                  content: aiResponse.content,
                  isUser: false,
                  chatMessageId: Date.now(),
                });
              } catch (error) {
                console.log("Failed to parse chunk:", error);
              }
            }
          }

          buffer = lines[lines.length - 1];
        }
        return chatId;
      } catch (error) {
        console.log("Error during fetching:", error);
        throw error;
      }
    },
    onSuccess: async (data, variables, context) => {
      setIsChatLoading(false);

      await queryClient.invalidateQueries({
        queryKey: ["titles"],
      });
      router.push(`/chat/${data}`);
    },
    onError: (error, variables, context) => {
      toast.error("잘못된 요청입니다.");
    },
  });
}
