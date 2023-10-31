import Youtube from "../api/youtube";
import YoutubeClient from "../api/youtubeClient";
import { YoutubeApiContext } from "./YoutubeApiContext";

const client = new YoutubeClient();
// const client = new FakeYoutubeClient();
const youtube = new Youtube(client); // <--

// Youtube를 사용할 수 있도록 인스턴스를 제공해준다
export function YoutubeApiProvider({ children }) {
  return <YoutubeApiContext.Provider value={{ youtube }}>{children}</YoutubeApiContext.Provider>; // 우산을 쓰고 있는 모든 children 컴포넌트에서 value를 사용한다고 하면 설정한 인스턴스를 사용
}
