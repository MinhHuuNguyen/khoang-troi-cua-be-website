import {  maxLengthMessage } from "@/utils/common";
import { z } from "zod";
import { REGEX_PHONE_NUMBER } from "@/utils/constants";

export const MeetingInputSchema = z
  .object({
    phone_number: z
    .string()
    .min(1, {
      message: "Không được để trống",
    })
    .max(11, {
      message: maxLengthMessage("Số điện thoại", 11),
    })
    .regex(REGEX_PHONE_NUMBER, {
      message: "Số điện thoại không hợp lệ",
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
