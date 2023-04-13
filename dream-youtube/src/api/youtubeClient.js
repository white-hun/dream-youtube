// import axios from "axios";

import axios from "axios";

// export default class YoutubeClient {
//   constructor() {
//     this.httpClient = axios.create({
//       baseURL: "https://www.googleapis.com/youtube/v3",
//       params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
//     });
//   }

//   async search(params) {
//     return this.httpClient.get("search", params);
//   }
//   async videos(params) {
//     return this.httpClient.get("videos", params);
//   }
// }

// 내부적으로 axios로 셋업하고 기본적으로 전달되어야하는 baseURL과 params를 설정
// 전달받은 params를 사용하여 constructor에서 설정한 실제 api에 get요청

// -----------------------------------------------------------------------------------------

export default class YoutubeClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  async search(params) {
    return this.httpClient.get("search", params);
  }
  async videos(params) {
    return this.httpClient.get("videos", params);
  }
  async channels(params) {
    return this.httpClient.get("channels", params);
  }
}
