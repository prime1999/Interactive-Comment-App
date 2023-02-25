import React, { useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import ReplyItem from "./ReplyItem";
import Reply from "./Reply";

function Replies({ newReplies, comment, current, handleShowReply, showReply }) {
  const [newReply, setNewReply] = useState([...newReplies]);

  const handleSubmit = async (reply) => {
    //save reply to json server (data.json)
    const res = await axios.put(
      `http://localhost:5000/comments/${comment.id}`,
      {
        ...comment,
        replies: [...comment.replies, reply],
      }
    );
    const data = await res.data;
    setNewReply([...data.replies]);
    handleShowReply();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      const res = await axios.patch(
        `http://localhost:5000/comments/${comment.id}`,
        {
          ...comment,
          replies: comment.replies.filter((reply) => reply.id !== id),
        }
      );
      setNewReply(newReply.filter((reply) => reply.id !== id));
    }
  };

  return (
    <>
      <div className="flex">
        <div className="border-l-2 mx-4"></div>
        <div>
          {newReply.map((reply) => (
            <ReplyItem
              key={reply.id}
              reply={reply}
              comment={comment}
              current={current}
              handleDelete={handleDelete}
              newReplies={newReplies}
            />
          ))}
        </div>
      </div>
      {/* reply component for comments update */}
      <AnimatePresence>
        <div className="mb-4">
          {showReply ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Reply
                handleSubmit={handleSubmit}
                comment={comment}
                current={current}
              />
            </motion.div>
          ) : (
            ""
          )}
        </div>
      </AnimatePresence>
    </>
  );
}

export default Replies;
