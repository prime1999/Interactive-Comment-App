import axios from "axios";
import { useState, useEffect, createContext } from "react";

const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [current, setCurrent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    fetchCurrent();
    fetchData();
  }, []);

  //fetch comments
  const fetchData = async () => {
    setLoading(true);
    const res = await axios("http://localhost:5000/comments");
    const data = await res.data;
    setLoading(false);
    setComments(data);
  };

  // fetch current user's data
  const fetchCurrent = async () => {
    const res = await axios("http://localhost:5000/currentUser");
    const data = await res.data;
    setCurrent(data);
  };

  //Add a new Comment
  const handleComment = async (reply) => {
    const res = await axios.post("http://localhost:5000/comments", reply);
    setComments([...comments, res.data]);
  };

  //Delete comment
  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/comments/${id}`);
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleCommentModal = () => {
    setShowCommentModal(showCommentModal ? false : true);
  };

  const handleReplyModal = () => {
    setShowReplyModal(showReplyModal ? false : true);
  };

  const handleEdit = () => {
    setEdit(edit ? false : true);
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        current,
        newComment,
        loading,
        showCommentModal,
        showReplyModal,
        edit,
        handleEdit,
        handleComment,
        handleCommentModal,
        handleReplyModal,
        handleDelete,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsContext;
