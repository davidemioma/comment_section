import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { CommentProps } from "../types";
import CommentLayout from "./CommentLayout";
import Reply from "./Reply";

interface Props {
  comment: CommentProps;
}

const Comment = ({ comment }: Props) => {
  const [replies, setReplies] = useState<CommentProps[]>([]);

  const [viewReplies, setViewReplies] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "comments", comment.id, "replies"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) =>
          setReplies(
            snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
          )
      ),
    []
  );

  return (
    <div className="w-full space-y-3">
      <CommentLayout comment={comment} />

      {replies.length > 0 && (
        <button
          onClick={() => setViewReplies((prev) => !prev)}
          className="text-blue-500 text-sm"
        >
          {viewReplies === true ? "Hide replies" : "View replies"}
        </button>
      )}

      {viewReplies && (
        <>
          {replies.length > 0 && (
            <div className="w-11/12 ml-auto space-y-3">
              {replies?.map((reply) => (
                <Reply key={reply.id} reply={reply} parentId={comment.id} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comment;
