import { Route } from "react-router-dom";
import { withAllContexts, withRouter } from "../../tests/utils";
import { fakeVideos } from "../../tests/videos";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import Videos from "../Videos";

describe("Videos", () => {
  const keyword = "BTS";
  const fakeYoutube = {
    search: jest.fn(),
  };

  afterEach(() => fakeYoutube.search.mockReset());

  it("render correctly", async () => {
    fakeYoutube.search.mockImplementation(() => fakeVideos);
    const { asFragment } = renderVideos();

    await waitForElementToBeRemoved(() => expect(screen.getByText("Loading...")));
    expect(asFragment()).toMatchSnapshot();
  });

  it("render related videos correctly", () => {
    fakeYoutube.search.mockImplementation(() => fakeVideos);
    renderVideos();

    expect(screen.getByText(`/videos/${keyword}`)).toBeInTheDocument();
    // expect(fakeYoutube.search).toBeCalledWith("keyword");
    // await waitFor(() => expect(screen.getAllByRole("listitem")).toHaveLength(fakeVideos.length));
  });

  it("render loading", () => {
    fakeYoutube.search.mockImplementation(() => fakeVideos);
    renderVideos();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("render error", async () => {
    fakeYoutube.search.mockImplementation(() => {
      throw new Error("error");
    });
    renderVideos();

    await waitFor(() => {
      expect(screen.getByText("Something is wrong.")).toBeInTheDocument();
    });
  });

  function renderVideos() {
    return render(
      withAllContexts(
        withRouter(<Route path="/videos/:keyword" element={<Videos />} />, `/videos/${keyword}`)
      )
    );
  }
});
