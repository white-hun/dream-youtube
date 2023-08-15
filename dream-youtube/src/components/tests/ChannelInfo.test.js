// TDD
// unit test할 때 네트워크 통신하면 안좋다, mock 구현 사항으로 대치
// 외부 의존성을 원하는 데이터로 대치해서 사용
// url있다면 어떻게 표기 되는지
// url 없다면 이름만 표기

// waitfor 주어진 함수가 에러를 던지지 않을 때 까지 재시도한다(요소를 화면에서 찾을 때 까지 재시도를 한다)

// 컴포넌트를 전달할 때는 router로 감싸야한다

import { render, screen, waitFor } from "@testing-library/react";
import { withAllContexts, withRouter } from "../../tests/utils";
import ChannelInfo from "../ChannelInfo";
import { Route } from "react-router-dom";

describe("ChannelInfo", () => {
  // 가짜 오브젝트
  const fakeYoutube = {
    channelImageURL: jest.fn(),
  };

  // 각각의 it이 호출이되고 난뒤에 매번 호출(mock을 reset)
  afterEach(() => fakeYoutube.channelImageURL.mockReset());

  it("renders correctly", async () => {
    // 하고싶은 동작 mocking
    fakeYoutube.channelImageURL.mockImplementation(() => "url");
    render(
      withAllContexts(
        withRouter(<Route path="/" element={<ChannelInfo id="id" name="channel" />} />),
        fakeYoutube
      )
    );
    await waitFor(() => {
      screen.getByText("channel");
    });
  });
});

// 컴포넌트 테스트를 할 때는 컴포넌트만 고립된 상태로 나머지 의존사항은 mocking 하는게 좋다
