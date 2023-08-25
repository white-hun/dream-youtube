// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
// import { formatAgo } from "../../util/date";
// import VideoCard from "../VideoCard";

// describe("VideoCard", () => {
//   const video = {
//     id: 1,
//     snippet: {
//       title: "title",
//       channelId: "1",
//       channelTitle: "channelTitle",
//       publishedAt: new Date(),
//       thumbnails: {
//         medium: {
//           url: "http://image/",
//         },
//       },
//     },
//   };
//   const { title, channelTitle, publishedAt, thumbnails } = video.snippet;

//   // prop을 잘 받아오는지에 대한 Test
//   it("renders video item", () => {
//     render(
//       <MemoryRouter>
//         <VideoCard video={video} />
//       </MemoryRouter>
//     );

//     const image = screen.getByRole("img"); // img 역할을 가지고 있는 HTML태그 요소를 가지고 온다
//     expect(image.src).toBe(thumbnails.medium.url); // image.src 는 thumbnails.medium.url을 가지고 있어야 한다
//     expect(image.alt).toBe(title); // image.alt 에 title이 있어야 한다
//     expect(screen.getByText(title)).toBeInTheDocument(); // 화면에 title을 가지고 오는데 title이 문서에 있어야 한다
//     expect(screen.getByText(channelTitle)).toBeInTheDocument();
//     expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
//   });

//   // 경로이동과 state로 데이터를 전달하는지에 대한 Test
//   it("navigates to detailed video page with video state when clicked", async () => {
//     function LocationStateDisplay() {
//       return <pre>{JSON.stringify(useLocation().state)}</pre>; // object(useLocation().state)를 받아서 JSON.stringify()를 사용해서 문자열로 바꿔준다
//     }
//     render(
//       <MemoryRouter initialEntries={["/"]}>
//         <Routes>
//           <Route path="/" element={<VideoCard video={video} />} />
//           <Route path={`/videos/watch/${video.id}`} element={<LocationStateDisplay />} />
//         </Routes>
//       </MemoryRouter>
//     );
//     // 처음에 시작하는 경로 initialEntries로 설정
//     // click에 되면 Route에 작성한 경로로 이동하는지

//     // <VideoCard />컴포넌트에 return 최상위 부모가 li인데 li tag는 listitem이라는 Role을 가지고 있다
//     // tag들은 각각 Role을 가지고 있다
//     const card = screen.getByRole("listitem");
//     await userEvent.click(card); //

//     expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
//   }); // 화면에 video의 객체를 문자열로 변경해서 보여지는지, 문서에 있는지 확인
// });

// useNavigate() may be used only in the context of a <Router> component.
// VideoCard 컴포넌트에서 useNavigate라는 react-router를 사용하고 있다
// react-router 컴포넌트를 만들 때에는 react-router 환경을 만들어 줘야한다
// <MemoryRouter>로 컴포넌트를 감싸준다(<StaticRouter>, <MemoryRouter>, <BrowserRouter>)
// MemoryRouter를 추천

// 실제로는 VideoCard에서 카드로 만들어진 li를 클릭하면 VideoDetail이라는 컴포넌트로 이동하지만
// VideoCard를 클릭했을 때 어떤 컴포넌트로 이동해야되는지에 대한 정보는 없다
// navigate를 했을 때 작성한 경로로 이동하는지와 state를 전달하는지에 대한 Test만 하면 된다

//------------------------------------------------------------------------------------------------------
// 리펙토링

// import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { Route, useLocation } from "react-router-dom";
// import { withRouter } from "../../tests/utils";
// import { fakeVideo as video } from "../../tests/videos";
// // videos.js에서 만든 fakeVideo를 가져와서 video라는 이름으로 사용한다
// import { formatAgo } from "../../util/date";
// import VideoCard from "../VideoCard";

// describe("VideoCard", () => {
//   const { title, channelTitle, publishedAt, thumbnails } = video.snippet;

//   it("renders video item", () => {
//     render(withRouter(<Route path="/" element={<VideoCard video={video} />} />));

//     const image = screen.getByRole("img");
//     expect(image.src).toBe(thumbnails.medium.url);
//     expect(image.alt).toBe(title);
//     expect(screen.getByText(title)).toBeInTheDocument();
//     expect(screen.getByText(channelTitle)).toBeInTheDocument();
//     expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
//   });

//   it("navigates to detailed video page with video state when clicked", async () => {
//     function LocationStateDisplay() {
//       return <pre>{JSON.stringify(useLocation().state)}</pre>;
//     }
//     render(
//       withRouter(
//         <>
//           <Route path="/" element={<VideoCard video={video} />} />
//           <Route path={`/videos/watch/${video.id}`} element={<LocationStateDisplay />} />
//         </>
//       )
//     );

//     const card = screen.getByRole("listitem");
//     userEvent.click(card);

//     await waitFor(() => {
//       expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
//     });
//   });
// });

// 전달받은 prop video의 데이터를 보여주는지
// navigate에의한 경로로 잘 이동하는지

//==========================================================================================
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import { MemoryRouter, Route, useLocation } from "react-router-dom";
import { fakeVideo as video } from "../../tests/videos";
import { withRouter } from "../../tests/utils";
import { formatAgo } from "../../util/date";
import VideoCard from "../VideoCard";

describe("VideoCard", () => {
  const { title, channelTitle, publishedAt, thumbnails } = video.snippet;

  // 정적인 ui, dom tree를 정확하게 검사하는 방법으로 JEST의 snapshot을 사용한다
  it("renders grid type correctly", () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<VideoCard video={video} />} />)
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("renders video item", async () => {
    render(withRouter(<Route path="/" element={<VideoCard video={video} />} />));

    const image = screen.getByRole("img");
    expect(image.src).toBe(thumbnails.medium.url);
    expect(image.alt).toBe(title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });

  // // grid 와 list 일 때 차이점을 명확하게 검사해야하는데 요소들이 보이는지만 검사하고 있다
  // // grid 와 list 일 때 정확하게 클래스 이름을 쓰는지 안쓰는지를 확인해야 한다
  // it("renders video list type", async () => {
  //   render(withRouter(<Route path="/" element={<VideoCard video={video} type="list" />} />));
  // });

  // react router로 부터 전달 받은 useLocation에 있는 상태를 <pre> tag 안에 보여준다
  // video/watch라는 경로에 왔을 때, 경로에 오면서 전달된 상태를 보여주기 위해서 만든 임의의 컴포넌트
  // 경로에서 VideoVard로 시작하는데 VideoCard가 클릭이 되면
  // 테스트로 전달된 video object가 가지고 있는 id에 해당하는 경로로 오는지 확인하기 위해서

  // 처음에 시작하는 경로를 명시해줘야한다 (initialEntries 속성)
  // 시작은 "/" 경로인 VideoCard에서 하는데
  // 클릭했을 때 VideoCard가 가지고 있는 id의 경로 `videos/watch/${video.id}`로 이동하는지 확인
  it("navigates to detailed video page with video state when chlicked", async () => {
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }

    render(
      withRouter(
        <>
          <Route path="/" element={<VideoCard video={video} />} />
          <Route path={`/videos/watch/${video.id}`} element={<LocationStateDisplay />} />
        </>
      )
    );

    const card = screen.getByRole("listitem"); // screen에 listitem에 해당하는 li를 가지고 온다(VideoCard의 최상위 부모 tag)
    userEvent.click(card); // 가져온 li가 클릭되면
    await waitFor(() => {
      expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
    });
  });
});

// React Router를 사용하는 컴포넌트를 만들 때는 React Router 환경을 만들어줘야한다

// 가상 screen에 text로 가지고 오는데 title, channelTitle, publishedAt들어있는 text가 Document 안에 있어야 한다

// unit test: util, api, 하나의 컴포넌트
// integration test: 컴포넌트들이 묶여있는 컴포넌트(페이지 컴포넌트),
//                   컴포넌트와 api같은 것을 통신하여 묶어서 사용하는 경우

// 컴포넌트에서 어떤걸 테스트할건지 특징과 주요기능들에 대해서 파악
// 정적인것에 대한 테스트(snapshot or react testing library 선택)
// 컴포넌트의 주요 기능, 목표 파악
// react router 안에 있는 컴포넌트는 memoryRouter를 꼭 감싸야한다

//==========================================================================================
