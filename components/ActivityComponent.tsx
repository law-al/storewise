import React from "react";

import { formatDistance, subSeconds } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const datas = [
  {
    username: "Daniella",
    image:
      "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    messages: { message: "purchased your product", createdAt: Date.now() },
  },
  {
    username: "Robert",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    messages: {
      message: "follow your shop",
      createdAt: new Date(2025, 4, 13, 7),
    },
  },
];

export default function ActivityComponent() {
  return (
    <div className="border-2 border-gray-300 rounded-md p-4">
      {datas.map((data) => (
        <div
          key={data.username}
          className="p-2 not-last-of-type:border-b-2 not-last-of-type:border-gray-300"
        >
          <div className="flex items-center gap-4">
            <Avatar className="size-13">
              <AvatarImage src={data.image} className="" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="">
              <p className="text-sm text-gray-500">
                <b className="text-[16px] text-black">{data.username} </b>
                {data.messages.message}
              </p>
              <div className="text-sm text-gray-500">
                {formatDistance(
                  subSeconds(new Date(data.messages.createdAt), 1),
                  new Date(),
                  { addSuffix: true }
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
