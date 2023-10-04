import { Route } from "react-router-dom";
import { withAllContexts, withRouter } from "../../tests/utils";
import { fakeVideo as video } from "../../tests/videos";
import VideoDetail from "../VideoDetail";
import { render } from "@testing-library/react";

describe("VideoDetail", () => {
  const { titl, channelId, channelTitle, description } = video.snippet;

  it("render correctly", () => {});
});
