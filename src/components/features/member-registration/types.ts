import { notEmptyMessage, maxLengthMessage } from "@/utils/common";
import { z } from "zod";

export const MemberRegistrationInputSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(1, {
      message: notEmptyMessage("Họ và tên"),
    })
    .max(255, {
      message: maxLengthMessage("Họ và tên"),
    }),
  birthday: z
    .string()
    .trim()
    .min(1, {
      message: notEmptyMessage("Ngày sinh"),
    }),
  email: z
    .string()
    .min(1, {
      message: notEmptyMessage("Email"),
    })
    .email({
      message: "Email không hợp lệ",
    }),
  phone_number: z
    .string()
    .min(1, {
      message: notEmptyMessage("Số điện thoại"),
    })
    .max(11, {
      message: maxLengthMessage("Số điện thoại", 11),
    }),
  address: z
    .string()
    .trim()
    .min(1, {
      message: notEmptyMessage("Địa chỉ"),
    })
    .max(255, {
      message: maxLengthMessage("Địa chỉ"),
    }),
  work_place: z
    .string()
    .trim()
    .min(1, {
      message: notEmptyMessage("Nơi làm việc"),
    })
    .max(255, {
      message: maxLengthMessage("Nơi làm việc"),
    }),
});

export type MemberRegistrationInputType = z.infer<typeof MemberRegistrationInputSchema>;
