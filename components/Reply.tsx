import React, { useState } from "react";
import { CommentProps } from "../types";
import Moment from "react-moment";
import { BsReplyFill } from "react-icons/bs";
import CommentForm from "./CommentForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

interface Props {
  reply: CommentProps;
  parentId: string;
}

const Reply = ({ reply, parentId }: Props) => {
  const [user] = useAuthState(auth);

  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <img
            className="w-7 h-7 rounded-full"
            loading="lazy"
            src={reply?.profileUrl ? reply?.profileUrl : "/no-profile.jpeg"}
            alt=""
          />

          <div className="sm:flex sm:items-center sm:space-x-2">
            <p className="text-sm font-bold">{reply.displayName}</p>

            {user?.displayName === reply.displayName && (
              <div className="hidden bg-blue-500 px-2 rounded sm:inline-flex items-center justify-center text-white text-sm">
                You
              </div>
            )}

            <p className="text-xs text-gray-500">
              <Moment
                fromNow
                date={new Date(reply?.timestamp?.seconds * 1000).toUTCString()}
              />
            </p>
          </div>
        </div>

        {user?.displayName !== reply.displayName && (
          <button
            onClick={() => setOpenForm((prev) => !prev)}
            className="flex items-center space-x-1 text-blue-500"
          >
            <BsReplyFill size={20} />

            <p>Reply</p>
          </button>
        )}
      </div>

      <p className="text-sm tracking-wide leading-6">
        <span className="text-blue-500 font-medium">@{reply?.replyTo}</span>{" "}
        {reply.comment}
      </p>

      {openForm && (
        <CommentForm
          parentId={parentId}
          replyTo={reply.displayName}
          setOpenForm={setOpenForm}
        />
      )}
    </div>
  );
};

export default Reply;
