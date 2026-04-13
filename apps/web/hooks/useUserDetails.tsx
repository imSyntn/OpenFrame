import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUserDetails, updateUserDetails } from "@/lib/apis";
import { ProfileType } from "@/@types";

export const useUserDetails = (id: string) => {
  return useQuery({
    queryKey: ["user-details", id],
    queryFn: () => getUserDetails(id),
  });
};

export const useUpdateUserDetails = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<ProfileType>) =>
      updateUserDetails(id, payload),
    onSuccess: (res) => {
      queryClient.setQueryData(["user-details", id], res);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-details"] });
    },
  });
};
