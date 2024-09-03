"use client";

import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { RecommendationFormSchema } from "../lib/RecommendationFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CommentStarter } from "../hooks/useStarterQuery";
import { useCommentStarterMutation } from "../hooks/useCommentStarterMutation";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  recommendations: CommentStarter[];
};

export default function UserRecommendation({ recommendations }: Props) {
  const { mutate } = useCommentStarterMutation();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof RecommendationFormSchema>>({
    resolver: zodResolver(RecommendationFormSchema),
    mode: "onSubmit",
    defaultValues: {
      recommendations: recommendations.length > 0 ? recommendations : [],
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: "recommendations",
  });
  const {
    formState: { dirtyFields },
  } = form;

  const onSubmit = async (data: z.infer<typeof RecommendationFormSchema>) => {
    if (dirtyFields.recommendations) {
      // Filter only the modified recommendations based on dirtyFields
      const updatedRecommendations = data.recommendations.filter(
        (_item, index) => dirtyFields.recommendations?.[index]?.comment
      );

      if (updatedRecommendations.length > 0) {
        mutate(updatedRecommendations as CommentStarter[]);
        form.reset(data);
        queryClient.invalidateQueries({ queryKey: ["commentStarter"] });
      } else {
        toast.error("수정한 정보가 없습니다.");
      }
    } else {
      toast.error("수정한 정보가 없습니다.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4 p-2 w-full h-full text-white">
      <div className="font-bold text-2xl text-gray-200">대화 스타터 설정</div>
      <Form {...form}>
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`recommendations.${index}.comment`}
            render={({ field }) => (
              <FormItem className="flex flex-col w-full mb-4 items-start px-4">
                <div className="flex flex-row w-full">
                  <FormControl className="flex-1 text-black">
                    <Input
                      className=""
                      {...field}
                      {...form.register(`recommendations.${index}.comment`)}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          className=" bg-blue-500 hover:bg-blue-700"
        >
          저장
        </Button>
      </Form>
    </div>
  );
}
