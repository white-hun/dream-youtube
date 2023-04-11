import axios from "axios";

// export default class FakeYoutube {
//   constructor() {}

//   async search(keyword) {
//     // <--
//     return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
//   }

//   async #searchByKeyword(keyword) {
//     return axios
//       .get(`/videos/${keyword}.json`) //
//       .then((res) => res.data.items)
//       .then((items) => items.map((item) => ({ ...item, id: item.id.videoId }))); // item를 낱개로 풀어서 다 그대로 쓸건데, // id를 개체로 쓰는것이 아니라 item에 있는 id내부의 videoId로 변경
//   }
//   async #mostPopular() {
//     return axios
//       .get(`/videos/popular.json`) //
//       .then((res) => res.data.items)
//       .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
//   }
// }

// class 멤버함수이면 function 작성하지 않아도 된다 -->

// search할 때 keywork가 있으면 this(class안에 있는 멤버함수인) #searchByKeyword를 호출한다(keyword 전달)
// 만약 keyword가 없다면 this에 있는 #mostPopular함수를 호출
// #은 private함수 - class 내부적으로는 호출이 가능하나 class 외부에서는 호출할 수 없다

// 외부에서는 searchByKeyword나 nostPopular상관하지 않고 그냥 search에 keyword만 전달하면된다 search(keyword)
// 그럼 내부적으로 알아서 keyword가 있다면  searchByKeyword를 없다면 nostPuplar를 호출

// -------------------------------------------------------------------------------

// export default class FakeYoutube {
//   constructor() {}

//   async search(keyword) {
//     return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
//   }

//   async #searchByKeyword(keyword) {
//     return axios
//       .get(`/videos/${keyword}.json`)
//       .then((res) => res.data.items)
//       .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
//   }
//   async #mostPopular() {
//     return axios
//       .get("/videos/popular.json")
//       .then((res) => res.data.items)
//       .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
//   }
// }

// -------------------------------------------------------------------------------

export default class FakeYoutube {
  constructor() {}

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword) {
    return axios
      .get(`/videos/${keyword}.json`)
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async #mostPopular() {
    return axios
      .get("/videos/popular.json")
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }
}
