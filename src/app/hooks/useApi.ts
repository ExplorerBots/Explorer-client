import { useQuery } from 'react-query';

const fetcher = (url: string) => () => fetch(url).then((r) => r.json());

export function useApi<T>(
   url: string
): [T | undefined, boolean, boolean | undefined] {
   const { data, isLoading, isError } = useQuery(url, fetcher(url));

   return [data, isLoading, isError];
}
