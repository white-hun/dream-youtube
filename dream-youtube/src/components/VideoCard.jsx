import React from "react";
import { formatAgo } from "../util/date";
import { useNavigate } from "react-router-dom";

export default function VideoCard({ video, type }) {
  const { title, channelTitle, thumbnails, publishedAt } = video.snippet;
  const decodeHtml = (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/videos/watch/${video.id}`, { state: { video } }); // MY: navigate 두번째 인자에 객체를 전달할 수 있다 state라는 key를 사용한다
  };
  const isList = type === "list";

  return (
    <li className={isList ? "flex gap-1 m-2" : ""} onClick={handleClick}>
      <img className={isList ? "w-60 mr-2" : "w-full"} src={thumbnails.high.url} alt={title} />
      <div className="">
        <p className="font-semibold my-2 line-clamp-2">{decodeHtml(title)}</p>
        <p className="text-sm opacity-80">{channelTitle}</p>
        <p className="text-sm opacity-80">{formatAgo(publishedAt)}</p>
      </div>
    </li>
  );
}

// 경로로 이동한 후 새로운 네트워크 통신을 해서 상세정보를 가지고 오는 것이 아니라
// router에서 부가적인 객체들을 전달할 때는 두번째인자에 객체를 전달해주면 된다
// state에 video라는 key에 video라는 객체를 전달

// 절대경로(/)를 사용하지 않으면 현재경로에서 그 뒤에 작성한 url 내용이 추가가 된다
