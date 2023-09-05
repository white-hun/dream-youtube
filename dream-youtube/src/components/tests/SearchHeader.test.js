import { Route } from "react-router-dom";
import { withRouter } from "../../tests/utils";
import SearchHeader from "../SearchHeader";
import renderer from "react-test-renderer";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// 1. SearchHeader가 잘 보여지고 있는지
// 2. 키워드를 입력하고 제출 버튼을 눌렀을 때 입력한 키워드가 포함된 경로로 이동이 잘 되는지
// 3. 검색 경로에 따라 keyword가 param으로 주어지는데, keyword가 input에 잘 표시되는지

describe("SearchHeader", () => {
  // render가 제대로 되는지 snapshot test
  it("renders correctly", () => {
    const component = renderer.create(withRouter(<Route path="/" element={<SearchHeader />} />));
    expect(component.toJSON()).toMatchSnapshot();
  });

  // 가상의 MemoryRouter에서 path에 keyword라는 경로가 있고 시작은 bts경로로 시작하도록 설정
  // path="/:keyword"일 때 Searchheader가 보여지는데 시작을 initialEntry로 /bts 경로가 전달되므로
  // param으로 bts가 전달된다

  // 특정 경로에 왔을 때 경로에 있는 검색이 입력폼(DisplayValue)에 표시되어야 한다
  // screen에서 입력폼에 bts가 있는지 확인
  it("renders with keyword correctly", () => {
    render(withRouter(<Route path="/:keyword" element={<SearchHeader />} />, "/bts"));
    expect(screen.getByDisplayValue("bts")).toBeInTheDocument();
  });

  // 검색어를 입력하고 form에 submit이 발생하면
  // 검색하는 keyword까지 묶어서 이동하는것을 검증
  // home경로에 searchHeader를 보여준 다음
  // /videos/fake-keyword 경로에 임의의 element가 보여지도록 작성
  // initialEntry는 /home
  it("navigates to results page on search button click", async () => {
    const searchKeyword = "fake-keyword";

    render(
      withRouter(
        <>
          <Route path="/home" element={<SearchHeader />} />
          <Route
            path={`/videos/${searchKeyword}`}
            element={<p>{`Search result for ${searchKeyword}`}</p>}
          />
        </>,
        "/home"
      )
    );

    // screen에 버튼과 입력폼을 가지고 와서
    const searchButton = screen.getByRole("button");
    const searchInput = screen.getByRole("textbox");

    // fake-keyword로 type한 후 버튼을 클릭하면
    userEvent.type(searchInput, searchKeyword);
    userEvent.click(searchButton);

    // 설정한 경로로 이동했다면 'Search result for ${searchKeyword}' 요소가 보여져야 한다
    await waitFor(() => {
      expect(screen.getByText(`Search result for ${searchKeyword}`)).toBeInTheDocument();
    });
  });
});

// 컴포넌트이기 때문에 보여지고있는 것들을 snapshot으로 테스트
// 검색을 클릭하면 경로로 이동하는지
// 검색경로에 따라서 keyword가 param으로 주어짐
// param이 input에 잘 표기가 되는지
