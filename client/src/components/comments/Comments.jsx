import { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../Axios.js";
import {useMutation, useQuery} from '@tanstack/react-query'
import moment from "moment";
import { useState } from "react";
import { queryClient } from "../../queryclient.js";

const Comments = ({postId}) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { isPending, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + postId).then((res) => {
        return res.data.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      setDesc('');
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    mutation.mutate({desc, postId});
  }

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment" value={desc} onChange={e => setDesc(e.target.value)}/>
        <button onClick={handleClick}>Send</button>
      </div>
      { isPending ? "Loading..." : data.map((comment) => (
        <div className="comment">
          <img src={comment.user.profilePic} alt="" />
          <div className="info">
            <span>{comment.user.username}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">{moment.utc(comment.createAt).local().fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
