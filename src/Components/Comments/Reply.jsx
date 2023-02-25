import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Reply({ current, comment, handleSubmit }) {
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");
  const [disabled, setDisabled] = useState(true);
  const handleText = (e) => {
    if (e.target.value.length < 20) {
      setMsg("Must have atleast 20 characters");
    } else if (e.target.value.lenght === 30) {
      setText(`${e.target.value} <br/>`);
    } else {
      setDisabled(false);
      setMsg("");
    }
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const reply = {
      id: uuidv4(),
      content: text,
      createdAt: "1 week ago",
      score: 4,
      replyingTo: comment.username,
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
    };
    handleSubmit(reply);
    setText("");
  };

  return (
    <div className="bg-white w-full p-4 rounded-lg">
      <form
        onSubmit={onSubmit}
        className="flex flex-col lg:flex-row w-full justify-between"
      >
        <div className="hidden lg:block">
          <img src={current.image.webp} alt="" />
        </div>
        <div className="w-full lg:w-2/3 h-24">
          <textarea
            onChange={handleText}
            value={text}
            className="w-full text-full whitespace-pre-wrap h-full rounded-md pt-3 pl-4 border border-3 resize-none focus:outline-none"
          ></textarea>
        </div>
        <div className="hidden lg:block">
          <button
            className={`${
              disabled ? "disabled" : ""
            } relative bg-moderateBlue text-white px-6 py-2 rounded-md`}
            type="submit"
          >
            Send
          </button>
        </div>
        <div className="flex flex-row items-center justify-between mt-4 lg:hidden">
          <div className="">
            <img src={current.image.webp} alt="" />
          </div>
          <div className="">
            <button
              className="relative bg-moderateBlue text-white px-6 py-2 rounded-md"
              type="submit"
            >
              Send
            </button>
          </div>
        </div>
      </form>
      <p className="pt-2 text-center text-moderateBlue text-md ">{msg}</p>
    </div>
  );
}

export default Reply;
