import { useContext, useState } from "react";
import axios from "axios";
import { FaPlus, FaMinus, FaEdit, FaTrash } from "react-icons/fa";
import CommentsContext from "../../Context/CommentsContext";
import ReplyModal from "./ReplyModal";

function CurrentUser({ reply, comment, handleDelete }) {
  const { handleReplyModal } = useContext(CommentsContext);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(reply.content);
  const [count, setCount] = useState(reply.score);

  const {
    createdAt,
    user: {
      image: { webp },
    },
    user: { username },
  } = reply;

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //Function to edit reply
  const editValue = async (id) => {
    setEdit(edit ? false : true);
    const newReply = { ...comment, ...reply, content: value };
    console.log(newReply);

    const res = await axios.put(
      `http://localhost:5000/comments/${comment.id}`,
      {
        ...comment,
        replies:
          reply.id === id
            ? [...comment.replies, { ...reply, content: value }]
            : [...comment.replies],
      }
    );
    setValue(value);
  };

  //handle score count
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

  return (
    <>
      <div className="w-11/12 flex flex-col bg-white mb-4 rounded-lg w-full p-4 md:flex-row md:justify-between md:items-start">
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
          <div className="flex items-center w-full">
            <div className="w-full flex flex-row justify-between">
              <div className="flex items-center">
                <img className="mr-2" src={webp} alt="Commenter's image" />
                <div className="flex justify-between">
                  <h4 className="mr-3 text-darkBlue font-bold">
                    {username}
                    <span className="bg-moderateBlue ml-2 px-2 py-1 text-white text-sm rounded-sm">
                      you
                    </span>
                  </h4>
                  <p className="text-lightGray font-bold">{createdAt}</p>
                </div>
              </div>
              {/* reply styling for desktop size */}
              <div className="hidden font-semibold items-center md:flex">
                <div
                  onClick={() => handleDelete(reply.id)}
                  className="flex items-center text-softRed hover:cursor-pointer hover:text-paleRed"
                >
                  <FaTrash className="mr-1" />
                  <h3 className="">Delete</h3>
                </div>
                <div
                  onClick={() => setEdit(true)}
                  className="flex items-center ml-3 text-moderateBlue hover:cursor-pointer hover:text-lightGrayishBlue"
                >
                  <FaEdit />
                  <h3 className="">Edit</h3>
                </div>
              </div>
            </div>
          </div>
          {edit === true ? (
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
            <>
              <p className="my-4">
                Replying to
                <span className="text-moderateBlue font-semibold">
                  {" "}
                  @{comment.user.username} <br />
                </span>{" "}
                {value}
              </p>
            </>
          )}
          {edit === true ? (
            <div className="flex items-end justify-end mt-2">
              <button
                onClick={() => editValue(reply.id)}
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
          <div className="flex items-center justify-between text-moderateBlue font-semibold md:hidden">
            <div className="flex items-center text-softRed">
              <FaTrash className="mr-1" />
              <h3 className="">Delete</h3>
            </div>
            <div
              onClick={() => setEdit(true)}
              className="flex items-center ml-3 text-moderateBlue"
            >
              <FaEdit />
              <h3 className="">Edit</h3>
            </div>
          </div>
        </div>
      </div>
      <ReplyModal handleDelete={handleDelete} reply={reply} />
    </>
  );
}

export default CurrentUser;
