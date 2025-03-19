import React from "react";

interface Props {
  msg: string;
}

export const About: React.FC<Props> = (props: Props) => {
  return (
        <h1 className="heading">This is the <span>About</span> page!</h1>
  );
}
