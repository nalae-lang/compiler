exports['IndentLexer 매치되는 경우 tab을 사용할 때 (tab전에 아무것도 없을 때) 1'] = {
  "type": "indent",
  "index": {
    "start": 0,
    "end": 1
  },
  "indentType": "tab"
}

exports['IndentLexer 매치되는 경우 스페이스를 사용할 때 1'] = {
  "type": "indent",
  "index": {
    "start": 0,
    "end": 2
  },
  "indentType": "space"
}

exports['IndentLexer reduceIndent 함수 유효한 Indent 토큰일 때 1'] = [
  {
    "type": "end",
    "index": {
      "start": 0,
      "end": 1
    },
    "endType": "newLine"
  },
  {
    "type": "indent",
    "index": {
      "start": 0,
      "end": 2
    },
    "indentType": "tab"
  },
  {
    "type": "indent",
    "index": {
      "start": 0,
      "end": 2
    },
    "indentType": "tab"
  }
]

exports['IndentLexer reduceIndent 함수 유효한 Indent 토큰일 때2 1'] = [
  {
    "type": "end",
    "index": {
      "start": 0,
      "end": 1
    },
    "endType": "dot"
  },
  {
    "type": "end",
    "index": {
      "start": 0,
      "end": 1
    },
    "endType": "newLine"
  },
  {
    "type": "indent",
    "index": {
      "start": 0,
      "end": 2
    },
    "indentType": "tab"
  },
  {
    "type": "indent",
    "index": {
      "start": 0,
      "end": 2
    },
    "indentType": "tab"
  }
]

exports['IndentLexer reduceIndent 함수 유효하지 않은 Indent 토큰일 때 1'] = [
  {
    "type": "end",
    "index": {
      "start": 0,
      "end": 1
    },
    "endType": "dot"
  }
]
