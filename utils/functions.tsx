import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase";

export const addComment = async (
  comment: string,
  parentId: string,
  replyTo: string,
  displayName: string,
  profileUrl: string
) => {
  if (parentId.trim() !== "" && replyTo.trim() !== "") {
    await addDoc(collection(db, "comments", parentId, "replies"), {
      replyTo,
      comment,
      displayName,
      profileUrl,
      timestamp: serverTimestamp(),
    });
  } else {
    await addDoc(collection(db, "comments"), {
      comment,
      displayName,
      profileUrl,
      timestamp: serverTimestamp(),
    });
  }
};
