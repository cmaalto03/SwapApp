import { useQuery } from "@tanstack/react-query";

const getSchoolItems = async (user) => {
  
  try {
    const response = await fetch(`http://localhost:3000/api/schoolitems`, {
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


  export const UseGetSchoolItems = (user) => {
    const {isLoading, data, refetch} = useQuery(['schoolitems', user], () => getSchoolItems(user))

    return {data, isLoading}
  }
