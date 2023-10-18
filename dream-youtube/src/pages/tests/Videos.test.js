import { Route } from "react-router-dom";
import { withAllContexts, withRouter } from "../../tests/utils";
import { fakeVideo, fakeVideos } from "../../tests/videos";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import Videos from "../Videos";

describe("Videos component", () => {
  const fakeYoutube = {
    search: jest.fn(),
  };

  beforeEach(() => {
    fakeYoutube.search.mockImplementation((keyword) => {
      return keyword ? [fakeVideo] : fakeVideos;
    });
  });

  afterEach(() => fakeYoutube.search.mockReset());

  // it("render correctly", async () => {
  //   fakeYoutube.search.mockImplementation(() => fakeVideos);
  //   const { asFragment } = renderVideos();

  //   await waitForElementToBeRemoved(() => expect(screen.getByText("Loading...")));
  //   expect(asFragment()).toMatchSnapshot();
  // });

  it("renders all videos when keyword is not specified", async () => {
    renderWithPath("/"); // keyword 없이 최상위 경로로 이동하면

    expect(fakeYoutube.search).toHaveBeenCalledWith(undefined); // 아무런 인자가 없는 상태로 호출되어야하고

    await waitFor(() => expect(screen.getAllByRole("listitem")).toHaveLength(fakeVideos.length));
  });

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

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
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

  function renderWithPath(path) {
    return render(
      withAllContexts(
        withRouter(
          <>
            <Route path="/:keyword" element={<Videos />} />
            <Route path="/:keyword" element={<Videos />} />, ))
          </>,
          path
        ),
        fakeYoutube
      )
    );
  }
});
