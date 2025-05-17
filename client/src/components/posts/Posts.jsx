import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = () => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["posts", currentUser?.id],
    queryFn: () =>
      makeRequest
        .get(`/posts?userId=${currentUser?.id}`)
        .then((res) => res.data),
    enabled: !!currentUser?.id, // Only run if userId exists
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;

  return (
    <div>
      {data?.map((post) => (
        <div key={post.id}>{post.desc}</div>
      ))}
    </div>
  );
};

export default Posts;