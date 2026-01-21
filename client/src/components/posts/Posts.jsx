import { makeRequest } from "../../Axios.js";
import {useQuery} from '@tanstack/react-query'
import Post from "../post/Post";
import "./posts.scss";
const Posts = ({userId}) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      makeRequest.get("/posts?userId=" + userId).then(res => {
        return(res.data.data);
      })
  });
  if (isPending) return <div>Loading...</div>;

  return <div className="posts">
    {data.map(post=>(
      <Post post={post} key={data.id}/>
    ))}
  </div>;
};

export default Posts;
