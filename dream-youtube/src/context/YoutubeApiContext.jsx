// 데이터 하나를 제공해주는 우산

import { createContext, useContext } from "react";
import Youtube from "../api/youtube";
import YoutubeClient from "../api/youtubeClient";
import FakeYoutubeClient from "../api/fakeYououtubeClient";

export const YoutubeApiContext = createContext();

const client = new YoutubeClient();
// const client = new FakeYoutubeClient();
const youtube = new Youtube(client); // <--

export function YoutubeApiProvider({ children }) {
  return <YoutubeApiContext.Provider value={{ youtube }}>{children}</YoutubeApiContext.Provider>; // 우산을 쓰고 있는 모든 children 컴포넌트에서 value를 사용한다고 하면 설정한 인스턴스를 사용
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}

// YoutubeApiProvider 라는 우산(context)을 만들고
// 어떤 Youtube 인스턴스를 사용할지 결정(FakeYoutube, Youtube) -->
// 그래서 UI를 보여주는 <videos> 컴포넌트에서는 어떤 인스턴스를 사용하는지 어떤 네트워크 통신을 하는지 어디서 데이터를 가지고 오는지 전혀 상관하지 않아도
// provider에서 제공해주는 youtube를 사용해서 원하는 함수를 호출하면 된다

// 1. context를 만든다
// 2. provider(우산?컴포넌트)을 만든다
// 3. useYoutubeApi를 사용하면 value(=youtube)를 사용할 수 있게 해준다
// 4.우산 씌워주고 필요한 곳에서 value를 불러온다
