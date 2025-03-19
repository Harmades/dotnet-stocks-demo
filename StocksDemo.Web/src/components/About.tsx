import React from "react";

interface Props {
  msg: string;
}

export const About: React.FC<Props> = (props: Props) => {
  return (
    <main>
      <div id="app">
        <h1 className="heading">This is the <span>About</span> page!</h1>
        <p>
          This is a webpack + {props.msg} project.
        </p>
      </div>
    </main>
  );
}
