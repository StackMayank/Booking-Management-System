import { useEffect, useState } from 'react';
import axiosInstance from '../axios-instance';

export default function useQuery({ url, options = {}, enabled = true }) {
  const [queryState, setQueryState] = useState({
    data: null,
    pending: enabled,
    error: null,
  });

  async function fetchData() {
    setQueryState((prev) => ({ ...prev, pending: true, error: null }));
    try {
      const response = await axiosInstance(url, options);
      setQueryState({
        data: response,
        pending: false,
        error: null,
      });
    } catch (e) {
      setQueryState((prev) => ({
        ...prev,
        error: e?.message || e || 'Something went wrong',
        pending: false,
      }));
    }
  }

  useEffect(() => {
    if (!enabled || !url) {
      setQueryState({ data: null, pending: false, error: null });
      return;
    }
    fetchData();
  }, [url, JSON.stringify(options), enabled]);

  return { refetchQuery: fetchData, ...queryState };
}
