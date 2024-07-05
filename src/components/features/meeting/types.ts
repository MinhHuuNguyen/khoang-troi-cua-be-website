import {  maxLengthMessage } from "@/utils/common";
import { z } from "zod";

export const MeetingInputSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, {
        message: "Không được để trống",
      })
      .max(255, {
        message: maxLengthMessage("Tên buổi gặp mặt"),
      }),
    date: z.any(),
   
    address: z
      .string()
      .trim()
      .min(1, {
        message: "Không được để trống",
      })
      .max(255, {
        message: maxLengthMessage("Địa chỉ"),
      }),
      host: z
      .string()
      .trim()
      .min(1, {
        message: "Không được để trống",
      })
      .max(255, {
        message: maxLengthMessage("Tên thành viên tiếp đón"),
      }),
  })

export type MeetingInputType = z.infer<
  typeof MeetingInputSchema
>;
