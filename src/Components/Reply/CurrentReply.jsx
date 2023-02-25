import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaEdit, FaTrash } from "react-icons/fa";

function CurrentReply({ currentReply, reply, removeReply }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(currentReply.content);
  const [count, setCount] = useState(currentReply.score);

  const {
    user: {
      image: { webp },
    },
    user: { username },
    createdAt,
  } = currentReply;

  const items = JSON.parse(localStorage.getItem("currentReply"));

  //handle score counts
  const handleIncrement = () => {
    if (count === currentReply.score) {
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

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //Function to edit reply
  const editValue = (id) => {
    setEdit(edit ? false : true);
    setValue(value);

    if (currentReply.id === id) {
      const target = items.find((obj) => obj.id === id);

      const newReply = { ...currentReply, content: value };

      Object.assign(target, newReply);
    }

    console.log(items);
    setTimeout(() => {
      localStorage.setItem("currentReply", JSON.stringify(items));
    }, 500);
  };

  return (
    <div className="w-11/12 flex flex-col bg-lightGrayishBlue mb-4 rounded-lg w-full p-4 md:flex-row md:justify-between md:items-start">
      <div className="hidden bg-veryLightGray rounded-md text-lightGray md:block md:flex-col md:px-0 py-2">
        <div className="px-2">
          {" "}
          <FaPlus className="hover:cursor-pointer" onClick={handleIncrement} />
          <p className="font-semibold text-moderateBlue font-semibold md:py-3">
            {count}
          </p>
          <FaMinus className="hover:cursor-pointer" onClick={handleDecrement} />
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
                onClick={() => removeReply(currentReply.id)}
                className="flex items-center text-softRed hover:cursor-pointer hover:text-paleRed"
              >
                <FaTrash className="mr-1" />
                <h3 className="">Delete</h3>
              </div>
              <div
                onClick={() => setEdit(true)}
                className="flex items-center ml-3 text-moderateBlue hover:cursor-pointer hover:text-grayishBlue"
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
              replying to
              <span className="text-moderateBlue font-semibold">
                {" "}
                @{reply.user.username}
              </span>{" "}
              <p>{value}</p>
            </p>
          </>
        )}
        {edit === true ? (
          <div className="flex items-end justify-end mt-2">
            <button
              onClick={() => editValue(currentReply.id)}
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
          <FaPlus className="hover:cursor-pointer" onClick={handleIncrement} />
          <p className="font-semibold mx-4 text-moderateBlue md:py-3">
            {count}
          </p>
          <FaMinus className="hover:cursor-pointer" onClick={handleIncrement} />
        </div>
        {/* reply styling for mobile size */}
        <div className="flex items-center justify-between text-moderateBlue font-semibold md:hidden">
          <div
            onClick={removeReply}
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
  );
}

export default CurrentReply;
