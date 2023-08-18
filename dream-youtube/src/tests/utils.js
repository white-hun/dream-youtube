import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Routes } from "react-router-dom";
import { YoutubeApiContext } from "../context/YoutubeApiContext";

export function withRouter(routes, initialEntry = "/") {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}

// Query를 사용하기 위해 컴포넌트를 감싸주는 역할을 하는 함수로 사용하기 쉽게 만든다
// 가짜 mock상태의 youtube를 전달할 것이다
// 어떤 youtube 인스턴스를 쓸건지 결정할 수 있도록 DI 받을 수 있게 만든다
// DI: Dependency Injection(의존성 주입)
export function withAllContexts(children, youtube) {
  const testClient = createTestQueryClient();

  // provider를 분리했기 때문에 의존하지 않는다
  // youtube가 객체로 사용되기 때문에 중괄호 해줘야 한다
  return (
    <YoutubeApiContext.Provider value={{ youtube: youtube }}>
      <QueryClientProvider client={testClient}>{children}</QueryClientProvider>
    </YoutubeApiContext.Provider>
  );
}
// YoutubeApiContest를 감싸면 모듈을 쓸 때 파일에서 생성하는 인스턴스(client) 때문에 불가피하게 YoutubeClient에서 사용하는 axios를 test코드에서 의존하게 된다
// test할 때는 실제 구현사항은 필요하지 않으므로 YoutubeApiContext에서 YoutubeProvider를 분리해준다

// 기존 Api에서의 설명
// 컴포넌트가 Youtube 구현사항(client(?))에 의존하는 순간, 네트워크 통신을 할 뿐만 youtube에 구현한 로직에도 의존을 하니까
// 컴포넌트 test 할 때에도 영향을 준다
// 컴포넌트 테스트를 할 때는 컴포넌트만 고립된 상태로 나머지 의존사항은 mocking 하는게 좋다
// 기존의 YoutubeApiProvider를 쓰는게 아니라 value에 youtube를 mock해서 따로 만들어줘야 한다

// youtube를 외부에서 가지고 올 수 있도록 만든다
// test를 할 때 mock상태(2번째 prop의 youtube)의 youtube를 전달하여 사용한다

// test용 query client 잘 만드는 방법
// tkdodo.eu 참고
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });
}
