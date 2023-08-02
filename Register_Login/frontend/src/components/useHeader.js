function useHeader() {
  const _token = localStorage.getItem("s_token");

  const headers = {
    headers: {
      Authorization: `Bearer ${_token}`,
    },
  };

  return headers;
}

export default useHeader;
