import reducer, { signIn } from "../userSlice";

test("userSlice", () => {
  expect(reducer(undefined, {})).toEqual({
    id: null,
    email: null,
    nickname: null,
  });
});

test("사용자가 로그인하면 사용자의 id, email, nickname이 저장이 된다", () => {
  const previousState = {};
  expect(
    reducer(
      previousState,
      signIn({ userId: "123", email: "yohan@gmail.com", nickname: "yohan" })
    )
  ).toEqual({
    id: "123",
    email: "yohan@gmail.com",
    nickname: "yohan",
  });
});
