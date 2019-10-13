import { checkPostPosition } from "utils/CheckPostPosition";

describe("utils/CheckPostPosition", () => {
  describe("알맞은 조사가 들어갔을 때", () => {
    it("상희가 일 때", () => {
      expect(checkPostPosition("상희가", ["이", "가"])).to.be.true;
    });

    it("hello을 일 때", () => {
      expect(checkPostPosition("hello을", ["을", "를"])).to.be.true;
    });

    it("hello를 일 때", () => {
      expect(checkPostPosition("hello를", ["을", "를"])).to.be.true;
    });

    it("변수랑 일 때", () => {
      expect(checkPostPosition("변수랑", ["이랑", "랑"])).to.be.true;
    });
  });

  describe("알맞지 않은 조사가 들어갔을 때", () => {
    it("상희이 일 때", () => {
      expect(checkPostPosition("상희이", ["이", "가"])).to.be.not.true;
    });

    it("변수이랑 일 때", () => {
      expect(checkPostPosition("변수이랑", ["이랑", "랑"])).to.be.not.true;
    });

    it("변수 일 때", () => {
      expect(checkPostPosition("변수", ["이랑", "랑"])).to.be.not.true;
    });
  });

  describe("두번째 조사가 더 길 때", () => {
    // 실제 한글의 경우에는 현재 존재하지 않는다.
    it("알맞은 조사일 때", () => {
      expect(checkPostPosition("안녕나가", ["가", "나가"])).to.be.not.true;
    });

    it("알맞지 않는 조사일 때", () => {
      expect(checkPostPosition("안녕가", ["가", "나가"])).to.be.true;
    });
  });
});