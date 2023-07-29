import { useQuery } from "@tanstack/react-query";

const getUserItems = async (user) => {
  try {
    const response = await fetch(`http://172.20.10.2:3000/api/useritems`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token} `,
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {}
};

export const UseGetUserItems = (user) => {
  const { isLoading, data, refetch } = useQuery(["useritems", user], () =>
    getUserItems(user)
  );

  return { data, isLoading };
};
