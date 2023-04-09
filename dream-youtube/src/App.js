import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;

// router는 아무 곳에서나 정의 해줘도 상관없다 어디에서나 가능하다
