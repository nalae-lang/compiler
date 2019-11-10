import { LexerErrorCode } from "lexer/error/ErrorCode";
import { CommentLexer } from "lexer/lexers/CommentLexer";
import snapshot = require("snap-shot-it");
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

import { expectTokenType } from "../../helper/lexer/CompareTokenType";
import { createLexer } from "../../helper/lexer/CreateLexer";

describe("CommentLexer", function() {
  describe("매치되는 경우", function() {
    it("/* */이 존재할 때", function() {
      const code = "/*test comment*/";
      const commentLexer = createLexer(CommentLexer, code);
      const result = commentLexer.parse(0);

      expectTokenType(result, LexerTokenTypes.COMMENT);
      expect(result.comment).to.equal("test comment");
      expect(result.index).to.deep.equal({ start: 0, end: code.length });
      snapshot(result);
    });

    it("// 이 존재할 때", function() {
      const code = "//test comment";
      const commentLexer = createLexer(CommentLexer, code);
      const result = commentLexer.parse(0);

      expectTokenType(result, LexerTokenTypes.COMMENT);
      expect(result.comment).to.equal("test comment");
      expect(result.index).to.deep.equal({ start: 0, end: code.length });
      snapshot(result);
    });

    it("// 이 존재하고 다음 라인으로 갈 때", function() {
      const code = "//test comment";
      const commentLexer = createLexer(CommentLexer, code + "\nnext");
      const result = commentLexer.parse(0);

      expectTokenType(result, LexerTokenTypes.COMMENT);
      expect(result.comment).to.equal("test comment");
      expect(result.index).to.deep.equal({ start: 0, end: code.length });
      snapshot(result);
    });
  });

  describe("매치되지 않는 경우", function() {
    it("/* 로 시작하고 안끝날때", function() {
      const commentLexer = createLexer(CommentLexer, "/* tesfs");
      expect(function() {
        commentLexer.parse(0);
      }).to.throw(LexerErrorCode.COMMENT_NOT_END);
    });

    it("/*/ 일 때", function() {
      const commentLexer = createLexer(CommentLexer, "/*fdg/");
      expect(function() {
        commentLexer.parse(0);
      }).to.throw(LexerErrorCode.COMMENT_NOT_END);
    });

    it("완전 존재하지 않을 때", function() {
      const commentLexer = createLexer(CommentLexer, "dfsdfdf");
      const result = commentLexer.parse(0);
      expect(result).to.be.not.exist;
    });

    it("/ 하나일 때", function() {
      const commentLexer = createLexer(CommentLexer, "/");
      const result = commentLexer.parse(0);
      expect(result).to.be.not.exist;
    });
  });
});
