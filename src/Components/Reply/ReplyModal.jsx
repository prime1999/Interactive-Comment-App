import { useContext } from "react";
import CommentsContext from "../../Context/CommentsContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

function ReplyModal({}) {
  const { showReplyModal, handleReplyModal } = useContext(CommentsContext);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };

  // const onDelete = (id) => {
  //   handleDelete(id);
  //   handleReplyModal();
  // };
  return (
    <>
      <div>
        <Modal
          keepMounted
          open={showReplyModal}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              <h2 className="font-semibold">Delete Comment</h2>
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              <p className="text-grayishBlue">
                Are you sure you want to remove this comment? This will remove
                the comment and can't be undone.
              </p>
            </Typography>
            <div className="flex justify-center mt-4">
              <button
                className="bg-grayishBlue py-2 px-6 rounded-md text-white"
                onClick={handleReplyModal}
              >
                No, Cancel
              </button>
              <button
                //onClick={() => onDelete(reply.id)}
                className="bg-softRed py-2 px-6 mx-2 rounded-md text-white"
              >
                Yes, Delete
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default ReplyModal;
