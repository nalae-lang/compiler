import { checkPostPosition } from "utils/CheckPostPosition";

describe("utils/CheckPostPosition", function () {
  describe("알맞은 조사가 들어갔을 때", function () {
    it("상희가 일 때", function () {
      expect(checkPostPosition("상희가", ["이", "가"])).to.equal(1);
    });

    it("hello을 일 때", function () {
      expect(checkPostPosition("hello을", ["을", "를"])).to.equal(0);
    });

    it("hello를 일 때", function () {
      expect(checkPostPosition("hello를", ["을", "를"])).to.equal(1);
    });

    it("변수랑 일 때", function () {
      expect(checkPostPosition("변수랑", ["이랑", "랑"])).to.equal(1);
    });
  });

  describe("알맞지 않은 조사가 들어갔을 때", function () {
    it("상희이 일 때", function () {
      expect(checkPostPosition("상희이", ["이", "가"])).to.be.false;
    });

    it("변수이랑 일 때", function () {
      expect(checkPostPosition("변수이랑", ["이랑", "랑"])).to.be.false;
    });

    it("변수 일 때", function () {
      expect(checkPostPosition("변수", ["이랑", "랑"])).to.be.false;
    });
  });

  describe("두번째 조사가 더 길 때", function () {
    // 실제 한글의 경우에는 현재 존재하지 않는다.
    it("알맞은 조사일 때", function () {
      expect(checkPostPosition("안녕나가", ["가", "나가"])).to.be.false;
    });

    it("알맞지 않는 조사일 때", function () {
      expect(checkPostPosition("안녕가", ["가", "나가"])).to.equal(1);
    });
  });
});
