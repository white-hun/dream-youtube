import axios from "axios";

// export default class Youtube {
//   constructor() {
//     this.httpClient = axios.create({
//       baseURL: "https://www.googleapis.com/youtube/v3",
//       params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
//     });
//   }

//   async search(keyword) {
//     return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
//   }

//   async #searchByKeyword(keyword) {
//     return this.httpClient
//       .get("search", {
//         params: {
//           part: "snippet",
//           maxResults: 25,
//           type: "video",
//           q: keyword,
//         },
//       }) //
//       .then((res) => res.data.items)
//       .then((items) => items.map((item) => ({ ...item, id: item.id.videoId }))); // item를 낱개로 풀어서 다 그대로 쓸건데, // id를 개체로 쓰는것이 아니라 item에 있는 id내부의 videoId로 변경
//   }
//   async #mostPopular() {
//     return this.httpClient
//       .get("videos", {
//         params: {
//           part: "snippet",
//           maxResults: 25,
//           chart: "mostPopular",
//         },
//       })
//       .then((res) => res.data.items);
//   }
// }

// constructor에서 axios할 때 필요한 기본적인 설정을 해준다
// 그걸 httpClient에 할당
// url과 key를 작성한다
// 어떤 api든 key를 작성해야한다(해당 api에서 발급받은 key)
// 시크릿 키 같은 것을 바로 코드에 적어서 깃허브에 커밋하면 보안에 매우 취약
// 이런 정보들은 제일 상위 폴더에 .env파일을 만들어서 작성해준다
// .env 파일은 create-react-app으로 APP을 만들면 기본적으로 사용할 수 있다
// 그리고 커밋되지 않도록 .gitignore에 꼭 .env를 작성한다
// .env는 절대 커밋하지 않고 환경변수 처럼 사용한다
// 나중에 배포할 때 변수(REACT_APP_YOUTUBE_API_KEY)를 서버상에서 환경변수로 설정해준다
// params는 api의 주소처럼 작성해주면 된다

// export default class Youtube {
//   constructor() {
//     this.httpClient = axios.create({
//       baseURL: "https://www.googleapis.com/youtube/v3",
//       params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
//     });
//   }

//   async search(keyword) {
//     return keyword ? this.#searchByKeyword() : this.#mostPopular();
//   }

//   async #searchByKeyword(keyword) {
//     return this.httpClient
//       .get("search", {
//         params: {
//           part: "snippet",
//           maxResults: 25,
//           type: "video",
//           q: keyword,
//         },
//       })
//       .then((res) => res.data.items)
//       .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
//   }
//   async #mostPopular() {
//     return this.httpClient
//       .get("videos", {
//         params: {
//           part: "snippet",
//           maxResults: 25,
//           chart: "mostPopular",
//         },
//       })
//       .then((res) => res.data.items);
//   }
// }

// -----------------------------------------------------------------------------------------

export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          q: keyword,
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async #mostPopular() {
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostPopular",
        },
      })
      .then((res) => res.data.items);
  }
}
