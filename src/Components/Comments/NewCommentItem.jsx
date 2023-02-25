import { useContext } from "react";
import { FaPlus, FaMinus, FaEdit, FaTrash } from "react-icons/fa";
import CommentsContext from "../../Context/CommentsContext";

function CurrentUser({ newComment }) {
  const { handleModal } = useContext(CommentsContext);
  const {
    score,
    user: {
      image: { webp },
      username,
    },
    createdAt,
    content,
  } = newComment;
  console.log(newComment);
  return (
    <>
      <div className="w-11/12 flex flex-col bg-white mb-4 rounded-lg w-full p-4 md:flex-row md:justify-between md:items-start">
        <div className="hidden bg-veryLightGray rounded-md text-lightGray md:block md:flex-col md:px-0 py-2">
          <div className="px-2">
            {" "}
            <FaPlus />
            <p className="text-moderateBlue font-semibold md:py-3">{score}</p>
            <FaMinus />
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
              {/* newComment styling for desktop size */}
              <div className="hidden font-semibold items-center md:flex">
                <div
                  onClick={handleModal}
                  className="flex items-center text-softRed hover:text-paleRed hover:cursor-pointer"
                >
                  <FaTrash className="mr-1" />
                  <h3>Delete</h3>
                </div>
                <div className="flex items-center ml-3 text-moderateBlue">
                  <FaEdit />
                  <h3 className="">Edit</h3>
                </div>
              </div>
            </div>
          </div>
          <p>{content}</p>
        </div>
        <div className="flex justify-between md:hidden">
          <div className="flex items-center justify-between bg-veryLightGray px-3 py-2 rounded-md text-lightGray md:flex-col md:px-0 py-2">
            <FaPlus />
            <p className="mx-4 text-moderateBlue md:py-3">{score}</p>
            <FaMinus />
          </div>
          {/* newComment styling for mobile size */}
          <div className="flex items-center justify-between text-moderateBlue font-semibold md:hidden">
            <div className="flex items-center text-softRed">
              <FaTrash className="mr-1" />
              <h3 className="">Delete</h3>
            </div>
            <div className="flex items-center ml-3 text-moderateBlue">
              <FaEdit />
              <h3 className="">Edit</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentUser;
