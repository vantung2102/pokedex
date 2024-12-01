import useSWR, { SWRConfiguration, SWRResponse } from 'swr';

const useFetch = <Data = unknown, Error = unknown>(
  SWRkey: string,
  SWRfetcher: (key: string) => Promise<Data>,
  options?: SWRConfiguration<Data, Error>,
): SWRResponse<Data, Error> => {
  const state = useSWR(SWRkey, SWRfetcher, {
    onError: (error) => {
      console.log(error);
    },
    revalidateOnFocus: false,
    ...options,
  });

  return { ...state };
};

export default useFetch;
