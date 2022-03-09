exports.validateDate = (start, finish) => {
  if (finish.diff(start, "d") > 1) {
    return `D-day ${finish.diff(start, "d")}일`;
  }

  if (finish.diff(start, "h") > 0) {
    return `D-day ${finish.diff(start, "h")}시간`;
  }

  if (finish.diff(start, "s") > 0) {
    return `D-day ${finish.diff(start, "m")}분`;
  }

  return "D-day";
};
