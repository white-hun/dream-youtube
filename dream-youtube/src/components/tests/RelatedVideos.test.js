import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { withAllContexts, withRouter } from "../../tests/utils";
import { Route } from "react-router-dom";
import RelatedVideos from "../RelatedVideos";
import { fakeVideos } from "../../tests/videos";

describe("RelatedVideos", () => {
  const fakeYoutube = {
    relatedVideos: jest.fn(),
  };

  afterEach(() => fakeYoutube.relatedVideos.mockReset());

  it("renders correctly", async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => fakeVideos);

    const { asFragment } = renderRelatedVideos();

    // loading 이 없어질 때까지 기다렸다가
    // 데이터가 들어오면 loading이 사라진다
    await waitForElementToBeRemoved(() => expect(screen.getByText("Loading...")));
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders related videos correctly", async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => fakeVideos);
    renderRelatedVideos();

    // mock 함수를 사용해 테스트할 때, 해당 Mock함수의 호출 시
    // 특정 인자 값과 함께 사용되었는지네 대한 테스트를 위해 toBeCalledWith를 사용한다

    // listitem을 가진 요소들이 fakeVideos가 가지고 있는 총 갯수와 같은지 확인
    expect(fakeYoutube.relatedVideos).toHaveBeenCalledWith("id");
    await waitFor(() => expect(screen.getAllByRole("listitem")).toHaveLength(fakeVideos.length));
  });

  it("renders loading", () => {
    fakeYoutube.relatedVideos.mockImplementation(() => fakeVideos);
    renderRelatedVideos();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error", async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => {
      throw new Error("error");
    });

    renderRelatedVideos();
    await waitFor(() => {
      expect(screen.getByText("Something is wrong")).toBeInTheDocument();
    });
  });

  function renderRelatedVideos() {
    return render(
      withAllContexts(
        withRouter(<Route path="/" element={<RelatedVideos id="id" />} />),
        fakeYoutube
      )
    );
  }
});
