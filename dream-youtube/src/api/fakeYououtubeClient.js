import axios from "axios";

export default class FakeYoutubeClient {
  // async search({ params }) {
  //   return params.relatedToVideoId
  //     ? axios.get(`/videos/related.json`)
  //     : axios.get(`/videos/bts.json`);
  // }
  async search({ params }) {
    return axios.get(`videos/${params.relatedToVideoId ? "related" : "bts"}.json`);
  }
  async videos() {
    return axios.get(`/videos/popular.json`);
  }
  async channels() {
    return axios.get(`/videos/channel.json`);
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
