import React, { useState, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FaPlus, FaMinus, FaReply, FaTrash, FaEdit } from "react-icons/fa";
import Replies from "../Reply/Replies";
import CommentsContext from "../../Context/CommentsContext";
import CommentModal from "./CommentModal";

function CommentItem({ comment }) {
  const { current, edit, handleCommentModal, handleEdit } =
    useContext(CommentsContext);
  const [showReply, setShowReply] = useState(false);
  const [value, setValue] = useState(comment.content);
  const [count, setCount] = useState(comment.score);

  const {
    createdAt,
    content,
    user: {
      image: { webp },
    },
    user: { username },
    replies,
  } = comment;
  const [newReply, setNewReply] = useState([...replies]);

  const handleIncrement = () => {
    if (count === comment.score) {
      setCount(count);
    } else {
      setCount(count + 1);
    }
  };
  const handleDecrement = () => {
    if (count === 0) {
      setCount(count);
    } else {
      setCount(count - 1);
    }
  };

  const editValue = async () => {
    handleEdit();
    const newComment = { ...comment, content: value };
    const res = await axios.put(
      `http://localhost:5000/comments/${comment.id}`,
      {
        ...newComment,
      }
    );
    const data = await res.data;
    setValue(data.content);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleShowReply = () => {
    setShowReply(showReply ? false : true);
  };

  return (
    <>
      <div className="flex flex-col bg-white mb-4 rounded-lg w-full p-4 md:flex-row md-justify-between md:items-start">
        <div className="hidden md:block bg-veryLightGray rounded-md text-lightGray md:flex-col md:px-0 py-2">
          <div className="px-2">
            {" "}
            <FaPlus
              className="hover:cursor-pointer"
              onClick={handleIncrement}
            />
            <p className="font-semibold text-moderateBlue font-semibold md:py-3">
              {count}
            </p>
            <FaMinus
              className="hover:cursor-pointer"
              onClick={handleDecrement}
            />
          </div>
        </div>
        <div className="w-11/12 ml-3 ml-4">
          <div className="flex items-center w-full">
            <div className="w-full flex justify-between justify-between">
              <div className="flex items-center">
                <img className="mr-2" src={webp} alt="Commenter's image" />
                <div className="flex justify-between">
                  <h4 className="mr-3 text-darkBlue font-bold">{username}</h4>
                  <p className="text-lightGray font-bold">{createdAt}</p>
                </div>
              </div>

              {/* reply styling for desktop size */}
              <div className="hidden w-24 text-moderateBlue font-semibold items-center md:flex">
                {/* conditional statement to get current user's comments styling */}
                {username === "juliusomo" ? (
                  <>
                    <div
                      onClick={handleCommentModal}
                      className="flex -ml-8 items-center text-softRed hover:cursor-pointer hover:text-paleRed"
                    >
                      <FaTrash className="" />
                      <h3 className="">Delete</h3>
                    </div>
                    <div
                      onClick={handleEdit}
                      className="flex items-center ml-3 text-moderateBlue hover:cursor-pointer hover:text-lightGrayishBlue"
                    >
                      <FaEdit />
                      <h3 className="">Edit</h3>
                    </div>
                  </>
                ) : (
                  <div
                    onClick={handleShowReply}
                    className="font-semibold items-center md:flex hover:cursor-pointer"
                  >
                    <FaReply />
                    <h3 className="ml-2">Reply</h3>
                  </div>
                )}
                {/* modal */}
              </div>
            </div>
          </div>
          {edit === true && username === "juliusomo" ? (
            <textarea
              autoFocus
              value={value}
              onChange={(e) => handleChange(e)}
              className="w-full"
              name="text"
              cols="10"
              wrap="soft"
            >
              {" "}
            </textarea>
          ) : (
            <p className="my-4">{value}</p>
          )}
          {edit === true && username === "juliusomo" ? (
            <div className="flex items-end justify-end mt-2">
              <button
                onClick={() => editValue(comment.id)}
                className="bg-moderateBlue px-4 py-2 rounded-md text-white"
              >
                Update
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="flex justify-between md:hidden">
          <div className="flex items-center justify-between bg-veryLightGray px-3 py-2 rounded-md text-lightGray md:flex-col md:px-0 py-2">
            <FaPlus
              className="hover:cursor-pointer"
              onClick={handleIncrement}
            />
            <p className="font-semibold mx-4 text-moderateBlue md:py-3">
              {count}
            </p>
            <FaMinus
              className="hover:cursor-pointer"
              onClick={handleDecrement}
            />
          </div>
          {/* reply styling for mobile size */}
          {/* conditional statement to get current user's comments styling */}
          {username === "juliusomo" ? (
            <>
              <div
                onClick={handleCommentModal}
                className="flex -ml-8 items-center text-softRed"
              >
                <FaTrash className="" />
                <h3 className="">Delete</h3>
              </div>
              <div
                onClick={handleEdit}
                className="flex items-center ml-3 text-moderateBlue"
              >
                <FaEdit />
                <h3 className="">Edit</h3>
              </div>
            </>
          ) : (
            <div
              onClick={() => setShowReply(!showReply)}
              className="font-semibold text-moderateBlue items-center md:flex hover:cursor-pointer"
            >
              <FaReply />
              <h3 className="ml-2">Reply</h3>
            </div>
          )}
        </div>
      </div>

      {/* replies component */}
      {current.map((current, index) => (
        <Replies
          key={index}
          current={current}
          showReply={showReply}
          comment={comment}
          newReplies={newReply}
          handleShowReply={handleShowReply}
        />
      ))}
      <CommentModal comment={comment} />
    </>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentItem;
