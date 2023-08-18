// TDD
// unit test할 때 네트워크 통신하면 안좋다, mock 구현 사항으로 대치
// 외부 의존성을 원하는 데이터로 대치해서 사용
// url 있다면 어떻게 표기 되는지, url 없다면 이름만 표기

import { render, screen, waitFor } from "@testing-library/react";
import { withAllContexts, withRouter } from "../../tests/utils";
import ChannelInfo from "../ChannelInfo";
import { Route } from "react-router-dom";

describe("ChannelInfo", () => {
  // 가짜 오브젝트
  // ChannelInfo.jsx에서 youtube의 channelImageURL만 사용하고 있으니 이것만 mocking 해주면 된다
  const fakeYoutube = {
    channelImageURL: jest.fn(), // jest에서 제공해주는 mocking 함수
  };

  // test가 끝날 때마다(각각의 it이 호출이되고 난뒤에) 매번 호출(mock을 reset)
  afterEach(() => fakeYoutube.channelImageURL.mockReset());

  it("renders correctly", async () => {
    // 하고싶은 동작 mocking
    // 성공적인 케이스를 text하기 위해 호출되면 url을 return
    fakeYoutube.channelImageURL.mockImplementation(() => "url");
    // 컴포넌트를 전달할 때는 Route로 감싸야한다
    render(
      withAllContexts(
        withRouter(<Route path="/" element={<ChannelInfo id="id" name="channel" />} />), // 1번째 prop(children)
        fakeYoutube // 2번째 prop(youtube)
      )
    );

    // waitfor 주어진 함수가 에러를 던지지 않을 때 까지 재시도한다(요소를 화면에서 찾을 때 까지 재시도를 한다(기다린다))
    await waitFor(() => {
      screen.getByText("channel");
    });
  });
});

// axios를 test 라이브러리에서 사용하면 항상 에러가 발생한다(SyntaxError: Cannot use import statement outside a module)
