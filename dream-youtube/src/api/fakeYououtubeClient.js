import axios from "axios";

export default class FakeYoutubeClient {
  async search(keyword) {
    return axios.get(`/videos/${keyword}.json`);
  }
  async videos() {
    return axios.get(`/videos/popular.json`);
  }
}
