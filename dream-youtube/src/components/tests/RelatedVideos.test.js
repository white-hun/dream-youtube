import { render, screen, waitForElementToBeRemoved } from "timeago.js";
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

    // await waitForElementToBeRemoved(screen.getByText("Loading..."));
    // expect(asFragment()).toMatchSnapshot();
  });

  function renderRelatedVideos() {
    render(
      withAllContexts(
        withRouter(<Route path="/" element={<RelatedVideos id="id" />} />),
        fakeYoutube
      )
    );
  }
});
