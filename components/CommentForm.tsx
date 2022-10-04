import React, { SetStateAction, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { addComment } from "../utils/functions";

interface Props {
  parentId: string;
  replyTo: string;
  setOpenForm?: React.Dispatch<SetStateAction<boolean>> | undefined;
}

const CommentForm = ({ parentId, replyTo, setOpenForm }: Props) => {
  const [user] = useAuthState(auth);

  const [comment, setComment] = useState("");

  const [loading, setloading] = useState(false);

  const addCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) return;

    setloading(true);

    addComment(
      comment,
      parentId,
      replyTo,
      `${user?.displayName}`,
      `${user?.photoURL}`
    )
      .then(() => {
        setComment("");

        setloading(false);

        setOpenForm && setOpenForm(false);
      })
      .catch((err) => {
        alert(err.message);

        setloading(false);

        setOpenForm && setOpenForm(false);
      });
  };

  return (
    <form
      onSubmit={addCommentHandler}
      className="w-full bg-white rounded-lg overflow-hidden p-4"
    >
      <textarea
        className="bg-transparent text-sm outline-none mb-2 rounded p-2 w-full border border-black"
        value={comment}
        rows={4}
        placeholder="Add a comment..."
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="flex items-center justify-between">
        <img
          className="w-8 h-8 rounded-full"
          loading="lazy"
          src={user?.photoURL ? user?.photoURL : "/no-profile.jpeg"}
          alt=""
        />

        <button
          className="bg-blue-500 w-20 flex items-center justify-center py-1 rounded text-white"
          type="submit"
          disabled={!comment.trim() || loading}
        >
          {loading ? (
            <div className="w-6 h-6 border-t disabled:cursor-not-allowed border-l border-white rounded-full animate-spin" />
          ) : (
            <p>Send</p>
          )}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
