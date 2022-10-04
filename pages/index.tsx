import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import CommentForm from "../components/CommentForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { CommentProps } from "../types";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import Comment from "../components/Comment";

const Home = () => {
  const [user] = useAuthState(auth);

  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "comments"), orderBy("timestamp", "desc")),
        (snapshot) =>
          setComments(
            snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
          )
      ),
    []
  );

  return (
    <div className="bg-gray-100 w-screen min-h-screen">
      <Head>
        <title>Comments</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {user ? (
        <main className="w-11/12 py-8 max-w-3xl mx-auto">
          <CommentForm parentId="" replyTo="" />

          {comments.length > 0 ? (
            <div className="my-5 space-y-4">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          ) : (
            <p className="mt-5 text-lg text-center font-bold">
              No comment available, feel free to post a comment!
            </p>
          )}
        </main>
      ) : (
        <main className="h-[calc(100vh-48px)] flex flex-col items-center justify-center">
          <img
            className="w-40 h-40 object-contain"
            src="/empty.svg"
            loading="lazy"
            alt=""
          />

          <h1 className="text-xl text-center font-bold">
            Sign in to add a comment and view comments.
          </h1>
        </main>
      )}
    </div>
  );
};

export default Home;
