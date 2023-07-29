import { useQuery } from "@tanstack/react-query";

const getSchoolItems = async (user) => {
  try {
    const response = await fetch(`http://172.20.10.2:3000/api/schoolitems`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token} `,
      },
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {}
};

export const UseGetSchoolItems = (user) => {
  const { isLoading, data, refetch } = useQuery(
    ["schoolitems", user],
    () => getSchoolItems(user),
    {
      //refetchInterval: 6000,
    }
  );

  return { data, isLoading };
};
