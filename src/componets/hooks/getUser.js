import { useQuery, queryKey } from "@tanstack/react-query";

const getUser = async (username, password) => {
  try {
    const response = await fetch("http://136.244.139.127:3000/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        password_repeat: password,
      }),
    });
    const json = await response.json();

    return json;
  } catch (error) {}
};

export const UseGetUser = (username, password) => {
  const { isLoading, data, refetch } = useQuery(
    ["user", username, password],
    () => getUser(username, password),
    {
      enabled: false,
    }
  );

  return { data, isLoading, refetch };
};
