exports['LEXER_RESULT_GRAMMER_1'] = [
  {
    "type": "grammer",
    "index": {
      "start": 0,
      "end": 6
    },
    "text": "텍스트박스의"
  },
  {
    "type": "grammer",
    "index": {
      "start": 7,
      "end": 9
    },
    "text": "값은"
  },
  {
    "type": "string",
    "index": {
      "start": 10,
      "end": 17
    },
    "string": "안녕하세요"
  },
  {
    "type": "grammer",
    "index": {
      "start": 17,
      "end": 19
    },
    "text": "이다"
  },
  {
    "type": "end",
    "index": {
      "start": 19,
      "end": 20
    },
    "endType": "dot"
  }
]

exports['MORPHEME_RESULT_1'] = [
  {
    "type": "property",
    "index": {
      "start": 0,
      "end": 6
    },
    "object": {
      "type": "identifier",
      "index": {
        "start": 0,
        "end": 5
      },
      "name": "텍스트박스"
    }
  },
  {
    "type": "subject",
    "index": {
      "start": 7,
      "end": 9
    },
    "subject": {
      "type": "identifier",
      "index": {
        "start": 7,
        "end": 8
      },
      "name": "값"
    },
    "subjectType": "은/는"
  },
  {
    "type": "string",
    "index": {
      "start": 10,
      "end": 17
    },
    "string": "안녕하세요"
  },
  {
    "type": "define",
    "index": {
      "start": 17,
      "end": 19
    },
    "value": null
  },
  {
    "type": "end",
    "index": {
      "start": 19,
      "end": 20
    },
    "endType": "dot"
  }
]

exports['LEXER_RESULT_GRAMMER_2'] = [
  {
    "type": "grammer",
    "index": {
      "start": 0,
      "end": 3
    },
    "text": "콘솔은"
  },
  {
    "type": "string",
    "index": {
      "start": 4,
      "end": 11
    },
    "string": "안녕하세요"
  },
  {
    "type": "grammer",
    "index": {
      "start": 11,
      "end": 12
    },
    "text": "를"
  },
  {
    "type": "grammer",
    "index": {
      "start": 13,
      "end": 17
    },
    "text": "출력한다"
  },
  {
    "type": "end",
    "index": {
      "start": 17,
      "end": 18
    },
    "endType": "dot"
  }
]

exports['MORPHEME_RESULT_2'] = [
  {
    "type": "subject",
    "index": {
      "start": 0,
      "end": 3
    },
    "subject": {
      "type": "identifier",
      "index": {
        "start": 0,
        "end": 2
      },
      "name": "콘솔"
    },
    "subjectType": "은/는"
  },
  {
    "type": "string",
    "index": {
      "start": 4,
      "end": 11
    },
    "string": "안녕하세요"
  },
  {
    "type": "identifier",
    "index": {
      "start": 11,
      "end": 12
    },
    "name": "를"
  },
  {
    "type": "identifier",
    "index": {
      "start": 13,
      "end": 17
    },
    "name": "출력한다"
  },
  {
    "type": "end",
    "index": {
      "start": 17,
      "end": 18
    },
    "endType": "dot"
  }
]

exports['LEXER_RESULT_GRAMMER_3'] = [
  {
    "type": "grammer",
    "index": {
      "start": 0,
      "end": 5
    },
    "text": "사람이라는"
  },
  {
    "type": "keyword",
    "index": {
      "start": 6,
      "end": 7
    },
    "name": "class"
  },
  {
    "type": "keyword",
    "index": {
      "start": 8,
      "end": 10
    },
    "name": "create"
  },
  {
    "type": "end",
    "index": {
      "start": 10,
      "end": 11
    },
    "endType": "dot"
  }
]

exports['MORPHEME_RESULT_3'] = [
  {
    "type": "named",
    "subject": {
      "type": "identifier",
      "index": {
        "start": 0,
        "end": 2
      },
      "name": "사람"
    },
    "index": {
      "start": 0,
      "end": 5
    },
    "name": "이라는"
  },
  {
    "type": "keyword",
    "index": {
      "start": 6,
      "end": 7
    },
    "name": "class"
  },
  {
    "type": "keyword",
    "index": {
      "start": 8,
      "end": 10
    },
    "name": "create"
  },
  {
    "type": "end",
    "index": {
      "start": 10,
      "end": 11
    },
    "endType": "dot"
  }
]
