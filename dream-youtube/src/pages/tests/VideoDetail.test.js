import { Route } from "react-router-dom";
import { withRouter } from "../../tests/utils";
import { fakeVideo } from "../../tests/videos";
import VideoDetail from "../VideoDetail";
import { render, screen } from "@testing-library/react";
import RelatedVideos from "../../components/RelatedVideos";
import ChannelInfo from "../../components/ChannelInfo";

jest.mock("../../components/ChannelInfo");
jest.mock("../../components/RelatedVideos");

describe("VideoDetail", () => {
  // 테스트가 각각끝날 때 마다 mock을 reset
  afterEach(() => {
    ChannelInfo.mockReset();
    RelatedVideos.mockReset();
  });
  it("renders video item details", () => {
    render(
      withRouter(<Route path="/" element={<VideoDetail />} />, {
        pathname: "/",
        state: { video: fakeVideo },
        key: "fake-key",
      })
    );

    const { title, channelId, channelTitle } = fakeVideo.snippet;
    expect(screen.getByTitle(title)).toBeInTheDocument(); // 유튜브 iframe을 가지고 있는데, 그 때 title을 가지고 있으니까 title을 가지고 있는 요소가 있는지 확인
    // VideoDetail 안에서 RelatedVideos, ChannelInfo에 prop이 정확하게 전달되었는지 검증하는 코드(jest함수: toStrictEqual)
    expect(RelatedVideos.mock.calls[0][0]).toStrictEqual({ id: fakeVideo.id });
    expect(ChannelInfo.mock.calls[0][0]).toStrictEqual({
      id: channelId,
      name: channelTitle,
    });
  });
});
