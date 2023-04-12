import React from "react";
import { useParams } from "react-router-dom";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import { useQuery } from "@tanstack/react-query";

export default function VideoDetail() {
  const { videoId } = useParams();
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  let {
    isLoading,
    error,
    data: detail,
  } = useQuery(["detail", keyword], () => youtube.search(keyword));
  const videoDetail = detail?.find((item) => item.id === videoId);

  return <>{videoDetail && console.log(videoDetail)}</>;
  // return <div>{videoDetail.snippet.title}</div>;
}
