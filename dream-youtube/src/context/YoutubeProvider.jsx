import Youtube from "../api/youtube";
import YoutubeClient from "../api/youtubeClient";
import { YoutubeApiContext } from "./YoutubeApiContext";

const client = new YoutubeClient();
// const client = new FakeYoutubeClient();
const youtube = new Youtube(client); // <--

export function YoutubeApiProvider({ children }) {
  return <YoutubeApiContext.Provider value={{ youtube }}>{children}</YoutubeApiContext.Provider>; // 우산을 쓰고 있는 모든 children 컴포넌트에서 value를 사용한다고 하면 설정한 인스턴스를 사용
}
