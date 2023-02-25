import { AnimatePresence, motion } from "framer-motion";
import { useState, useContext, useEffect } from "react";
import { FaPlus, FaMinus, FaReply } from "react-icons/fa";
import CurrentUser from "./CurrentUser";
import Reply from "./Reply";
import CurrentReply from "./CurrentReply";

function ReplyItem({ reply, comment, current, handleDelete, newReplies }) {
  const getLocalStorageItems = () => {
    const currentReply = localStorage.getItem("currentReply");
    if (currentReply) {
      return JSON.parse(localStorage.getItem("currentReply"));
    } else {
      return [];
    }
  };

  const [showReply, setShowReply] = useState(false);
  const [count, setCount] = useState(reply.score);
  const [currentReply, setCurrentReply] = useState(getLocalStorageItems());

  const {
    content,
    score,
    user: {
      username,
      image: { webp },
    },
    createdAt,
  } = reply;

  useEffect(() => {
    localStorage.setItem("currentReply", JSON.stringify(currentReply));
  }, [currentReply]);

  //handle score counts
  const handleIncrement = () => {
    if (count === reply.score) {
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

  //Add reply to local storage
  const handleSubmit = (reply) => {
    setCurrentReply([reply, ...currentReply]);
    setShowReply(false);
  };

  const removeReply = (id) => {
    setCurrentReply(currentReply.filter((reply) => reply.id !== id));
  };

  if (current.username === username) {
    return (
      <>
        <CurrentUser
          comment={comment}
          current={current}
          handleDelete={handleDelete}
          reply={reply}
          newReplies={newReplies}
        />
      </>
    );
  } else if (current.user !== username) {
    return (
      <>
        <div className="w-full flex flex-col bg-white mb-4 rounded-lg p-4 md:flex-row md:justify-between md:items-start">
          <div className="hidden bg-veryLightGray rounded-md text-lightGray md:block md:flex-col md:px-0 py-2">
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
            <div className="items-center">
              <div className="w-full flex justify-between">
                <div className="flex items-center">
                  <img className="mr-2" src={webp} alt="Commenter's image" />
                  <div className="flex justify-between">
                    <h4 className="mr-3 text-darkBlue font-bold">{username}</h4>
                    <p className="text-lightGray font-bold">{createdAt}</p>
                  </div>
                </div>
                {/* reply styling for desktop size */}
                <div
                  onClick={() => setShowReply(!showReply)}
                  className="hidden text-moderateBlue font-semibold items-center md:flex hover:cursor-pointer hover:text-lightGrayishBlue"
                >
                  <FaReply />
                  <h3 className="ml-2">Reply</h3>
                </div>
              </div>
            </div>
            <p className="my-4">
              {" "}
              Replying to
              <span className="text-moderateBlue font-semibold">
                {" "}
                @{comment.user.username}
              </span>{" "}
              {content}
            </p>
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
            <div
              onClick={() => setShowReply(!showReply)}
              className="flex items-center justify-between text-moderateBlue font-semibold hover:cursor-pointer md:hidden hover:text-lightGrayishBlue"
            >
              <FaReply />
              <h3 className="ml-2">Reply</h3>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {showReply ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2,
                default: { ease: "linear" },
              }}
            >
              <div className="flex relative mb-4 w-full justify-end">
                <Reply
                  comment={comment}
                  current={current}
                  handleSubmit={handleSubmit}
                />
              </div>
            </motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>
        {currentReply !== []
          ? currentReply.map((currentReply) => (
              <>
                <CurrentReply
                  key={currentReply.id}
                  currentReply={currentReply}
                  removeReply={removeReply}
                  reply={reply}
                />
              </>
            ))
          : ""}
      </>
    );
  }
}

export default ReplyItem;
