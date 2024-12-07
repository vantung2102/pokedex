import { useQuery, QueryFunction, UseQueryOptions } from '@tanstack/react-query';

export function useFetch(queryKey: any, queryFn: any, options: UseQueryOptions) {
  const state = useQuery({
    queryKey,
    queryFn,
    onError: (error: any) => {
      console.error(error);
    },
    retry: false,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    ...options,
  });

  return { ...state };
}
