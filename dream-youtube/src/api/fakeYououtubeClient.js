import axios from "axios";

export default class FakeYoutubeClient {
  async search(keyword) {
    return axios.get(`/videos/${keyword}.json`);
  }
  async videos() {
    return axios.get(`/videos/popular.json`);
  }
}

// params는 전혀 신경쓰지 않고 정해진 mock data를 읽는다

// -----------------------------------------------------------------------------------------
// import axios from "axios";
// export default class FakeYoutubeClient {
//   async search(keyword) {
//     return axios.get(`/videos/${keyword}.json`);
//   }

//   async videos() {
//     return axios.get("/videos/popular.json");
//   }
// }
