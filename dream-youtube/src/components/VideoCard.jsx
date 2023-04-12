import React from "react";
import { formatAgo } from "../util/date";
import { Link, useParams } from "react-router-dom";

export default function VideoCard({ video }) {
  const { title, channelTitle, thumbnails, publishedAt } = video.snippet;
  const decodeHtml = (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  return (
    <Link to={`/videos/watch/${video.id}`}>
      <li>
        <img className="w-full" src={thumbnails.medium.url} alt={title} />
        <div>
          <p className="font-semibold my-2 line-clamp-2">{decodeHtml(title)}</p>
          <p className="text-sm opacity-80">{channelTitle}</p>
          <p className="text-sm opacity-80">{formatAgo(publishedAt)}</p>
        </div>
      </li>
    </Link>
  );
}
