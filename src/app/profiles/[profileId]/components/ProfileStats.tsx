import React from "react";

const ProfileStats = () => {
  return (
    <section className="flex justify-end items-center gap-x-8 pr-12 mb-14 text-whiteShade">
      <div className="flex-col flex justify-center items-center ">
        <span className="font-bold text-[28px]"> 24</span>
        <span className="font-medium text-2xl"> Posts</span>
      </div>
      <div className="flex-col flex justify-center items-center ">
        <span className="font-bold text-[28px]"> 24</span>
        <span className="font-medium text-2xl"> Followers</span>
      </div>
      <div className="flex-col flex justify-center items-center ">
        <span className="font-bold text-[28px]"> 24</span>
        <span className="font-medium text-2xl"> Following</span>
      </div>
    </section>
  );
};

export default ProfileStats;
