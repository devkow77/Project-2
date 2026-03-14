import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: Props) {
  return (
    <div
      className={twMerge("mx-auto w-full max-w-410 px-0 lg:px-4", className)}
    >
      {children}
    </div>
  );
}
