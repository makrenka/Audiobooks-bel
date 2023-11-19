export const useHttp = () => {
  const request = async (
    url = "",
    method = "GET",
    body = null,
    headers = { "Content-Type": "application/json" }
  ) => {
    try {
      const responce = await fetch(url, { method, body, headers });

      if (!responce.ok) {
        throw new Error(
          `Could not fetch ${url} with status: ${responce.status}`
        );
      }

      const data = await responce.json();

      return data;
    } catch (e) {
      throw e;
    }
  };

  return { request };
};
