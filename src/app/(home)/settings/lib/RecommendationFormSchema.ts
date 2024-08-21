import { z } from "zod";

export const RecommendationFormSchema = z.object({
  recommendations: z.array(
    z.object({
      comment: z
        .string()
        .min(1, {
          message: "내용은 1글자 이상, 50자 미만이어야 합니다.",
        })
        .max(50, { message: "내용은 1글자 이상, 50자 미만이어야 합니다." }),
      id: z.number(),
    })
  ),
});
