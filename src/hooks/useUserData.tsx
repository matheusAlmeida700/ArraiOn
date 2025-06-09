import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userDataService, userService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

export function useUserData() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => userService.getById(user.id),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });
}

export const useUser = (id?: string) => {
  const isFetchingSingle = !!id;

  const query = useQuery({
    queryKey: isFetchingSingle ? ["user", id] : ["users"],
    queryFn: isFetchingSingle
      ? () => userService.getById(id!)
      : userService.getAll,
    enabled: isFetchingSingle ? !!id : true,
  });

  return query;
};

export const useUpdateUserCoins = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      coinsToAdd,
    }: {
      userId: string;
      coinsToAdd: number;
    }) => {
      return userDataService.updateCoins(userId, coinsToAdd);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user", variables.userId] });
    },
  });
};
