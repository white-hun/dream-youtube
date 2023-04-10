import React from "react";

export default function VideoCard({ video }) {
  const decodeHtml = (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  return <div>{decodeHtml(video.snippet.title)}</div>;
}
