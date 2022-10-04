import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { auth, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "@firebase/auth";

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <header className="flex items-center justify-between px-4 h-12 shadow-md">
      <div className="relative w-8 h-8">
        <Image src="/favicon.ico" layout="fill" objectFit="contain" />
      </div>

      <div>
        {user ? (
          <img
            onClick={() => signOut(auth)}
            className="w-10 h-10 rounded-full cursor-pointer"
            loading="lazy"
            src={user?.photoURL ? user?.photoURL : "/no-profile.jpeg"}
            alt=""
          />
        ) : (
          <button
            onClick={() => signInWithGoogle()}
            className="flex space-x-2 items-center border border-gray-300 py-1 px-2 rounded"
          >
            <FcGoogle size={20} />

            <p>Sign in with google</p>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
