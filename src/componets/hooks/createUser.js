import { useRegister } from "../../../store/RegisterContext";
import { useQuery } from "@tanstack/react-query";
const createUser = async (user) => {
  try {
    const response = await fetch("http://172.20.10.2:3000/api/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const UseCreateUser = (user) => {
  const { isLoading, data, refetch } = useQuery(
    ["createUser", user],
    () => createUser(user),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  return { data, isLoading, refetch };
};

export default createUser;
