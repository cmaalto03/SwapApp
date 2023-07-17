import { useQuery } from "@tanstack/react-query";



const getUserItems = async (user) => {

  try {
    const response = await fetch(`http://localhost:3000/api/myitems`, {
      method: "GET", 
      headers: {
        "Authorization": `Bearer ${user.data.token} `
      },
    })
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error)
  } 
};


  export const UseGetUserItems = (user) => {
    const {isLoading, data, refetch} = useQuery(['data', user], () => getUserItems(user))

    return {data, isLoading}
  }
