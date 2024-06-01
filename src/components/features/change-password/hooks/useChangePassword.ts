import { useMutation } from "@tanstack/react-query";

export const useChangePassword = () => {
  return useMutation({
    mutationKey: ["changePassword"],
    mutationFn: async (data: any) => {
      const response = await fetch("/api/change_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        return result;
      }

      const error = new Error(result.message || "Something went wrong");

      return error;
    },
  });
};
