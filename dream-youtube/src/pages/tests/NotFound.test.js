import renderer from "react-test-renderer";
import { withRouter } from "../../tests/utils";
import { Route } from "react-router-dom";
import NotFound from "../NotFound";

describe("NotFound", () => {
  it("renders correctly", () => {
    const component = renderer.create(withRouter(<Route path="/" element={<NotFound />} />));
    expect(component.toJSON()).toMatchSnapshot();
  });
});

// 메모리 라우터를 만들어서 라우터를 설정한다음에 정의한 경로 외에 다른 곳으로 가면
// <NotFound/>가 나오는지 테스트를 해봐도 되지만
// 그럼 우리의 코드를 테스트하는 것이 아니라 React Router 자체를 테스트하는 것이기 때문에 굳이 그정도 수준의 테스트는 작성하지 않는다
// 이미 React Router 라이브러리 자체에 완벽한 TDD가 작성되어 검증되어 있기 때문이다
