// TDD
// unit test할 때 네트워크 통신하면 안좋다, mock 구현 사항으로 대치
// 외부 의존성을 원하는 데이터로 대치해서 사용(외부 의존성의 데이터가 주어졌을 때 컴포넌트가 어떻게 동작하는지 확인)
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
    // 성공적인 케이스를 text하기 위해 channelImageURl이 호출되면 url을 return하도록 mockImplementation을 사용
    fakeYoutube.channelImageURL.mockImplementation(() => "url");
    // 컴포넌트를 전달할 때는 Route로 감싸야한다
    const { asFragment } = render(
      withAllContexts(
        withRouter(<Route path="/" element={<ChannelInfo id="id" name="channel" />} />), // 1번째 prop(children)
        fakeYoutube // 2번째 prop(youtube)
      )
    );
    // waitfor 주어진 함수가 에러를 던지지 않을 때 까지 재시도한다(요소를 화면에서 찾을 때 까지 재시도를 한다(기다린다))
    await waitFor(() => {
      screen.getByRole("img");
    });
    expect(asFragment()).toMatchSnapshot();
  });
  // 그냥 snapshot 하면 url 받아오는 것이 비동기이기 때문에 url이 없을 때 image 없이 name만 출력된다
  // img가 나타날 때까지 기다린다, mock 구현사항에서 url을 반환하니까 channelIndo 컴포넌트에서 url을 받아오면 img가 생성되니까 img를 나타낼 수 있다
  // 특정 사용자 작업에 따라 변경되는 테스트가 있을 수 있는데 이런 변동성이 있는 값들을 rendeResult로써 렌더링된 컴포넌트를 반환하기 위해 asFragment를 사용한다
  // api에서 받아오는 데이터 마다 url이 다르기 때문에 asFragment를 사용

  // url 없을 때 img가 표시되지 않는 테스트
  it("renders without URL", () => {
    renderChannelInfoWithCallback(() => {
      throw new Error("error");
    });
    expect(screen.queryByRole("img")).toBeNull();
  });

  // url이 있을 때 image 보여주는 테스트
  it("renders with URL", async () => {
    renderChannelInfoWithCallback("url");

    await waitFor(() => {
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });

  // 자주 사용되는 render 부분 리펙토링
  function renderChannelInfoWithCallback(callback) {
    fakeYoutube.channelImageURL.mockImplementation(() => callback);
    return render(
      withAllContexts(
        withRouter(<Route path="/" element={<ChannelInfo id="id" name="channel" />} />),
        fakeYoutube
      )
    );
  }
});

// axios를 test 라이브러리에서 사용하면 항상 에러가 발생한다(SyntaxError: Cannot use import statement outside a module)

// render 를 호출하면 renderResult를 반환하는데
