import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";

// import FakeYoutube from "../api/fakeYououtube";
import Youtube from "../api/youtube";

export default function Videos() {
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["videos", keyword], () => {
    // const youtube = new FakeYoutube();
    const youtube = new Youtube();
    return youtube.search(keyword);
  });
  return (
    <>
      <div>Videos {keyword ? `🔍${keyword}` : `🔥`}</div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {videos && (
        <ul>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
}

// fetch의 문제점
// fetch는 데이터를 받아왔다고 판단할 때 then으로 보내게 되는데
// 백엔드에서 status 코드를 보낼 때도 데이터를 받아오는 것이기 때문에
// 정상코드인 200을 받든, 404 notfound, 400 params error받든 데이터로 판단해서 error라도
// then으로 보내게된다
// 그럼 then안에서 throw를 사용해서 status 코드가 200대가 아니면 수동적으로 error를 처리해야한다
// 이것을 해결하기 위해 axios를 사용한다

// 200대는 axios로 200대가 아니거나 400대는 catch로 들어간다
// 네트워크 통신 에러 뿐만 아니라 백엔드에서 데이터를 제대로 처리하지 못한경우도 catch로 들어온다
// 새로운 데이터를 사용하는 경우 post함수 사용

// useQuery는 비동기 상태관리를 해주는 라이브러리일 뿐 비동기 행동이 무엇인지는 결정되어 있지 않다
// FE에서 비동기라고 하면 네트워크 통신을 말할수도 있지만
// 네트워크 통신 뿐만아니라 특정한 비동기적인 행동을 하는 경우에도 useQuery를 사용할 수 있다
// useQuery자체로는 어떻게 네트워크 통신을 해야하는지 네트워크 통신에 관련된 문제는 해결해주지 않는다

// 문제점
// 1. 실제 API를 사용해서 YouTube API와 잘되는지 만든 APP이 잘 동작하는지 확인이 필요한데 Mock data와 실제 API를 스위칭 하는 방법이 필요하다
// 2. 컴포넌트 내에 네트워크 통신 내부 구현 사항이 너무 많이 노출되어 있다
// 또 다른 부분에서 특정 동작(ex.검색기능)에 관해서 사용해야한다면 동일한 코드를 다시 구현해야하는데 재사용성, 유지보수가 떨어진다. useQuery의 callback함수에 내용이 다 포함 되어 있기 때문에 가독성도 떨어진다
// 그래서 대부분 api를 따로 뺴서 관리하는데 --> /api/youtube.js
// 그 후 useQuery 두 번째 인자 callback함수에 작성한 api를 사용한다
// 컴포넌트에서는 어떤 네트워크 통신도 신경쓰지 않는다

// youtube.js라는 동일한 함수(동인한 api)들이 있는 두가지 구현 사항을 만든다
//  search라는 api가 있으면
// 하나는 Fake(json에서 읽어오는 데이터)
// 다른 하나는 Implementation(실제 api의 데이터)
//---------------------------------------------------------------------------------------------

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
// import VideoCard from "../components/VideoCard";

// export default function Videos() {
//   const { keyword } = useParams();
//   // 1.인자 key 안에 키워드 별로 캐시가 되도록 한다
//   //2.인자 어떻게 네트워크 통신을 할 건지
//   const {
//     isLoading,
//     error,
//     data: videos,
//   } = useQuery(["videos", keyword], async () => {
//     return fetch(`/videos/${keyword ? keyword : "popular"}.json`)
//       .then((res) => res.json())
//       .then((data) => data.items);
//   });
//   return (
//     <>
//       <div>Videos {keyword ? `🔍${keyword}` : `🔥`}</div>
//       {isLoading && <p>Loading...</p>}
//       {error && <p>{error.message}</p>}
//       {videos && (
//         <ul>
//           {videos.map((video) => (
//             <VideoCard key={video.id} video={video} />
//           ))}
//         </ul>
//       )}
//     </>
//   );
// }
