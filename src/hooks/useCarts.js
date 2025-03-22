import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../contexts/UserContext';
import { addOrUpdateToCart, getCart, removeFromCart } from '../api/firebase';

export default function useCarts() {
  const { uid } = useUser();
  const queryClient = useQueryClient();

  const cartsQuery = useQuery({
    queryKey: ['carts', uid],
    queryFn: async () => {
      const carts = await getCart(uid);
      return carts;
    },
    staleTime: 1000 * 60,
    enabled: !!uid, // uid가 있는 경우에만 해당 쿼리를 사용할 수 있도록 설정
  });

  const addOrUpdateItem = useMutation({
    mutationFn: (addedProduct) => addOrUpdateToCart(uid, addedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts', uid] });
    },
  });

  const removeItem = useMutation({
    mutationFn: ({ id }) => removeFromCart(uid, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts', uid] });
    },
  });

  return { cartsQuery, addOrUpdateItem, removeItem };
}
