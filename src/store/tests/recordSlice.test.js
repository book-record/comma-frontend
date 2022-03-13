import reducer, { recordSound } from "../recordSlice";

test("recordSlice", () => {
  expect(reducer(undefined, {})).toEqual({
    content: null,
    formData: null,
    isValue: false,
  });
});

test("녹음 기록이 저장이 되면 content, formData, isValue에 저장이 된다", () => {
  const previousState = {};
  expect(
    reducer(
      previousState,
      recordSound({
        content: "blob:http://localhost:3000/abc",
        data: Object,
        value: true,
      })
    )
  ).toEqual({
    content: "blob:http://localhost:3000/abc",
    formData: Object,
    isValue: true,
  });
});

test("기존에 녹음기록이 있는데 사용자가 재녹음을 누르면 값이 초기화 된다", () => {
  const currentState = {
    content: "blob:http://localhost:3000/abc",
    formData: Object,
    isValue: true,
  };
  expect(
    reducer(
      currentState,
      recordSound({ content: null, data: null, value: false })
    )
  ).toEqual({
    content: null,
    formData: null,
    isValue: false,
  });
});
