import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface UseFetchProps {
  url: string;
  revalidate?: boolean;
  interval?: number;
}

const useFetch = ({ url, revalidate, interval }: UseFetchProps) => {
  const [revalidateKey, setRevalidateKey] = useState("");
  const [data, setData] = useState<any>();
  const [error, setError] = useState(false);

  // function to fetch data
  const fetch = useCallback(async () => {
    setError(false);
    try {
      const fetchedData = await axios.get(url);
      setData(fetchedData.data);
    } catch {
      setError(true);
    }
  }, [url]);

  useEffect(() => {
    const revalidateInterval = setInterval(() => {
      if (revalidate) {
        setRevalidateKey(Math.random().toString());
      }
      // on first load fetch data and when revalidateKey changes
    }, (interval ? interval : 3) * 1000);
    return () => clearInterval(revalidateInterval);
  }, [interval, revalidate]);

  useEffect(() => {
    // on first load fetch data
    fetch();
  }, [fetch, revalidateKey]);

  return {
    data,
    error,
    revalidate: fetch,
  };
};

export default useFetch;
