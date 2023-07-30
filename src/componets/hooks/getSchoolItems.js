import { useInfiniteQuery } from "@tanstack/react-query";
export default function getSchoolItems(user, number) {
  const getItems = async ({ pageParam = 0 }) => {
    const res = await (
      await fetch(`http://172.20.10.2:3000/api/schoolitems?page=${pageParam}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token} `,
        },
      })
    ).json();
    return {
      data: res,
      nextPage: pageParam + 1,
    };
  };

  return useInfiniteQuery(["schoolitems"], getItems, {
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
  });
}
