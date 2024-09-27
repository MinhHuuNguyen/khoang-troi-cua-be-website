import { useMutation } from "@tanstack/react-query";
import { MemberRegistrationInputType } from "../types";

export const useCreateMemberRegistration = () => {
  return useMutation({
    mutationKey: ["createMemberRegistration"],
    mutationFn: async (data: MemberRegistrationInputType) => {
      const response = await fetch("/api/member_registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });
};
