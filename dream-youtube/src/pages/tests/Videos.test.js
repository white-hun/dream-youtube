import { Route } from "react-router-dom";
import { withAllContexts, withRouter } from "../../tests/utils";
import { fakeVideo, fakeVideos } from "../../tests/videos";
import { render, screen, waitFor } from "@testing-library/react";
import Videos from "../Videos";

describe("Videos component", () => {
  const fakeYoutube = {
    search: jest.fn(),
  };

  // 사용자가 keyword로 검색하면 search한 결과를 보여주고
  // 아니라면 popular video를 보여준다
  beforeEach(() => {
    fakeYoutube.search.mockImplementation((keyword) => {
      return keyword ? [fakeVideo] : fakeVideos;
    });
  });

  afterEach(() => fakeYoutube.search.mockReset());

  // keyword가 지정되어 있지 않을 때
  it("renders all videos when keyword is not specified", async () => {
    renderWithPath("/"); // keyword 없이 최상위 경로로 이동하면

    expect(fakeYoutube.search).toHaveBeenCalledWith(undefined); // 아무런 인자가 없는 상태로 호출되어야하고

    await waitFor(() => expect(screen.getAllByRole("listitem")).toHaveLength(fakeVideos.length));
  });

  // keyword로 검색했을 때
  it("when keyword is specified, renders search results", async () => {
    const searchKeyword = "fake-keyword";
    renderWithPath(`/${searchKeyword}`); // keyword가 있는 경로로 렌더링 했을 경우

    expect(fakeYoutube.search).toHaveBeenCalledWith(searchKeyword); // keyword와 함께 호출
    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(1);
    });
  });

  it("renders loading state when items are being fetched", async () => {
    renderWithPath("/");

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument(); // ignore 옵션
  });

  it("renders error state when fetching items fails", async () => {
    fakeYoutube.search.mockImplementation(async () => {
      throw new Error("error");
    });

    renderWithPath("/");

    await waitFor(() => {
      expect(screen.getByText(/Something is wrong/i)).toBeInTheDocument();
    });
  });

  // 최상위 경로와 keyword가 있는 경로 일때 <Videos />가 보여지도록 만든다
  function renderWithPath(path) {
    return render(
      withAllContexts(
        withRouter(
          <>
            <Route path="/" element={<Videos />} />
            <Route path="/:keyword" element={<Videos />} />
          </>,
          path
        ),
        fakeYoutube
      )
    );
  }
});
