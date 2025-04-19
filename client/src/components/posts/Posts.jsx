import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Posts = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"], // A unique key for this query
    queryFn: () =>
      axios.get("http://localhost:8800/api/posts", { withCredentials: true })
        .then((res) => res.data),
  });

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading..."
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
