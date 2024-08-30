import React from "react";

const UserInfo = (session) => {
  session = session.session;
  return (
    <div className="  m-5">
      <h1 className="text-2xl font-bold "> User Profile</h1>
      <session className=" text-xl text-left mt-5">
        <p> ID: {session?.user?.id}</p>
        <p> username: {session?.user?.username}</p>
        <p> Role: {session?.user?.role}</p>
      </session>
    </div>
  );
};
export default UserInfo;
