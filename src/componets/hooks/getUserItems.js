import { useQuery } from "@tanstack/react-query";

const getUserItems = async (user) => {
  try {
    const response = await fetch(
      `https://kqo7qnhj0l.execute-api.us-east-1.amazonaws.com/prod/api/useritems`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token} `,
        },
      }
    );
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
