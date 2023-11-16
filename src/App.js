import React, { useState } from "react";
import Container from "./components/Container";
import Header from "./components/Header";
import NewEvent from "./components/NewEvent";
import { useSelector } from "react-redux";

function App() {
  const isNewOpen = useSelector((state) => state.isNewOpen.isNewOpen);

  return (
    <div className="App h-screen relative">
      <div>
        <Header />
        <Container />
      </div>
      {isNewOpen && <NewEvent />}
    </div>
  );
}

export default App;
