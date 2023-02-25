import React, { useContext } from "react";
import Spinner from "../Spinner";
import CommentItem from "./CommentItem";
import Comment from "./Comment";
import CommentsContext from "../../Context/CommentsContext";
import NewCommentItem from "./NewCommentItem";

function Comments() {
  const { comments, current, handleComment, loading, newComment } =
    useContext(CommentsContext);
  //console.log(comments);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
      {newComment.map((newComment) => (
        <NewCommentItem key={newComment.id} newComment={newComment} />
      ))}

      <div className="mt-4">
        {current.map((current, index) => (
          <Comment
            key={index}
            handleComment={handleComment}
            current={current}
          />
        ))}
      </div>
    </div>
  );
}

export default Comments;
