"use client";

import { z } from "zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { RecommendationFormSchema } from "../lib/RecommendationFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";

export default function UserRecommendation() {
  const [recommendations, setRecommendations] = useState([
    { id: 1, content: "오늘 날씨에 맞는 음식 추천해줘" },
    { id: 2, content: "집 어떻게 가야할지 추천해줘" },
    { id: 3, content: "가장 빠른 코딩테스트 날짜가 언제야?" },
  ]);

  const form = useForm<z.infer<typeof RecommendationFormSchema>>({
    resolver: zodResolver(RecommendationFormSchema),
    mode: "onSubmit",
    defaultValues: {
      recommendations: recommendations.length > 0 ? recommendations : [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "recommendations",
  });
  const {
    formState: { dirtyFields },
  } = form;

  const onSubmit = async (data: z.infer<typeof RecommendationFormSchema>) => {
    if (Object.keys(dirtyFields).length > 0) {
      // mutate(data);
      console.log("Data to submit:", data);
    } else {
      toast.error("수정한 정보가 없습니다.");
      console.log("No changes detected, no mutation occurred.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-2 w-full h-full text-white">
      <div className="font-bold text-2xl text-gray-200">대화 스타터 설정</div>
      <Form {...form}>
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`recommendations.${index}.content`}
            render={({ field }) => (
              <FormItem className="flex flex-col w-full items-start px-4">
                <FormLabel className="text-base mt-10 font-light">
                  {index + 1}번
                </FormLabel>
                <div className="flex flex-row gap-2 w-full">
                  <FormControl className="flex-1 text-black">
                    <Input
                      {...field}
                      {...form.register(`recommendations.${index}.content`)}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    disabled={fields.length <= 1}
                    className="p-2 bg-red-500"
                    variant="ghost"
                  >
                    <Minus size={20} />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          type="button"
          onClick={() =>
            fields.length < 3
              ? append({ content: "" })
              : toast.error("최대 3개의 문구만 추가할 수 있습니다.")
          }
          className="mt-4 p-2 rounded-full bg-white text-black"
          variant="ghost"
        >
          <Plus size={20} />
        </Button>

        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          className="absolute bottom-10"
        >
          Save
        </Button>
      </Form>
    </div>
  );
}
