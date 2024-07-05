import { useMutation } from "@tanstack/react-query";
import { MeetingInputType } from "../types";

export const useMeetingMember = () => {
  return useMutation({
    mutationKey: ["useMeetingMember"],
    mutationFn: async (data: MeetingInputType) => {
      const response = await fetch("/api/meeting_member", {
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
