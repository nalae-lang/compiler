import { TokenTypes } from "token";

import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { createLexer } from "../../helper/lexer/CreateLexer";
import { CommentLexer } from "lexer/lexers/CommentLexer";
import { ErrorCode } from "lexer/error/ErrorCode";

describe("CommentLexer", () => {
  describe("매치되는 경우", () => {
    it("/* */이 존재할 때", () => {
      const commentLexer = createLexer(CommentLexer, "/*test comment*/");
      const result = commentLexer.parse(0);

      if (compareTokenType(result, TokenTypes.COMMENT)) {
        expect(result.comment).to.equal("test comment");
      }
    });

    it("// 이 존재할 때", () => {
      const commentLexer = createLexer(CommentLexer, "//test comment");
      const result = commentLexer.parse(0);

      if (compareTokenType(result, TokenTypes.COMMENT)) {
        expect(result.comment).to.equal("test comment");
      }
    });

    it("// 이 존재하고 다음 라인으로 갈 때", () => {
      const commentLexer = createLexer(CommentLexer, "//test comment\ntest");
      const result = commentLexer.parse(0);

      if (compareTokenType(result, TokenTypes.COMMENT)) {
        expect(result.comment).to.equal("test comment");
      }
    });
  });

  describe("매치되지 않는 경우", () => {
    it("/* 로 시작하고 안끝날때", () => {
      const commentLexer = createLexer(CommentLexer, "/* tesfs");
      expect(() => {
        commentLexer.parse(0);
      }).to.throw(ErrorCode.COMMENT_NOT_END);
    });

    it("/*/ 일 때", () => {
      const commentLexer = createLexer(CommentLexer, "/*fdg/");
      expect(() => {
        commentLexer.parse(0);
      }).to.throw(ErrorCode.COMMENT_NOT_END);
    });

    it("완전 존재하지 않을 때", () => {
      const commentLexer = createLexer(CommentLexer, "dfsdfdf");
      const result = commentLexer.parse(0);
      expect(result).to.be.not.ok;
    });

    it("/ 하나일 때", () => {
      const commentLexer = createLexer(CommentLexer, "/");
      const result = commentLexer.parse(0);
      expect(result).to.be.not.ok;
    });
  });
});
