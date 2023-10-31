import React from "react";
import { Outlet } from "react-router-dom";
import SearchHeader from "./components/SearchHeader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { YoutubeApiProvider } from "./context/YoutubeApiProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <SearchHeader />
      <YoutubeApiProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </YoutubeApiProvider>
    </>
  );
}

export default App;

// router는 아무 곳에서나 정의 해줘도 상관없다 어디에서나 가능하다

// outlet에 있는 모든 컴포넌트들이 youtube 인스턴스들을 사용할 수 있다
