import React from "react";
import webpackLogo from "../assets/webpack.png";

const App:React.FC = () => {


  return (
    <main>
      <div id="app">
        <img alt="Webpack logo" src={webpackLogo} />
        <h1 className="heading">This is the <span>Home</span> page!</h1>
        <p> Click the buttons below to increment and decrement the count.</p>
    
      </div>
    </main>
  );
}

export default App;
