import { useRef, useState } from "react";

const useApi = (apiCall, initialData = []) => {
  const [data, setData] = useState(initialData);
  const [isLodading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dataRef = useRef();
  const responseRef = useRef();

  const request = async (...args) => {
    setData(initialData);
    setIsLoading(true);
    setIsError(false);
    const response = await apiCall(...args);
    responseRef.current = response;
    setIsLoading(false);
    if (!response.ok) setIsError(true);
    setData(response.data);
    dataRef.current = response.data;
  };
  return { data, isLodading, isError, request, dataRef, responseRef };
};

export default useApi;
