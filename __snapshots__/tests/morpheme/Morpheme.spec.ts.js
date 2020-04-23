exports['Morpheme 주어 테스트 1'] = [
  {
    "type": "grammar",
    "index": {
      "start": 0,
      "end": 6
    },
    "text": "텍스트박스의"
  },
  {
    "type": "grammar",
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
    "type": "grammar",
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

exports['Morpheme 주어 테스트 2'] = [
  {
    "type": "property",
    "tokenIndex": {
      "start": 0,
      "end": 1
    },
    "object": {
      "type": "identifier",
      "tokenIndex": {
        "start": 0,
        "end": 1
      },
      "index": {
        "start": 0,
        "end": 5
      },
      "name": "텍스트박스"
    },
    "index": {
      "start": 0,
      "end": 6
    }
  },
  {
    "type": "subject",
    "tokenIndex": {
      "start": 1,
      "end": 2
    },
    "subject": {
      "type": "identifier",
      "tokenIndex": {
        "start": 1,
        "end": 2
      },
      "index": {
        "start": 7,
        "end": 8
      },
      "name": "값"
    },
    "endType": "은",
    "index": {
      "start": 7,
      "end": 9
    }
  },
  {
    "type": "assert",
    "value": {
      "type": "string",
      "index": {
        "start": 10,
        "end": 17
      },
      "string": "안녕하세요"
    },
    "tokenIndex": {
      "start": 2,
      "end": 4
    },
    "index": {
      "start": 10,
      "end": 19
    }
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

exports['Morpheme 함수 테스트 1'] = [
  {
    "type": "grammar",
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
    "type": "grammar",
    "index": {
      "start": 11,
      "end": 12
    },
    "text": "를"
  },
  {
    "type": "grammar",
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

exports['Morpheme 함수 테스트 2'] = [
  {
    "type": "subject",
    "tokenIndex": {
      "start": 0,
      "end": 1
    },
    "subject": {
      "type": "identifier",
      "tokenIndex": {
        "start": 0,
        "end": 1
      },
      "index": {
        "start": 0,
        "end": 2
      },
      "name": "콘솔"
    },
    "endType": "은",
    "index": {
      "start": 0,
      "end": 3
    }
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
    "tokenIndex": {
      "start": 2,
      "end": 3
    },
    "name": "를",
    "index": {
      "start": 11,
      "end": 12
    }
  },
  {
    "type": "identifier",
    "tokenIndex": {
      "start": 3,
      "end": 4
    },
    "name": "출력한다",
    "index": {
      "start": 13,
      "end": 17
    }
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

exports['Morpheme 함수 정의 테스트 1'] = [
  {
    "type": "grammar",
    "index": {
      "start": 0,
      "end": 3
    },
    "text": "콘솔은"
  },
  {
    "type": "operator",
    "index": {
      "start": 4,
      "end": 5
    },
    "operator": "~"
  },
  {
    "type": "grammar",
    "index": {
      "start": 5,
      "end": 6
    },
    "text": "를"
  },
  {
    "type": "grammar",
    "index": {
      "start": 7,
      "end": 12
    },
    "text": "출력한다를"
  },
  {
    "type": "keyword",
    "index": {
      "start": 13,
      "end": 17
    },
    "name": "function_define"
  },
  {
    "type": "operator",
    "index": {
      "start": 17,
      "end": 18
    },
    "operator": ","
  }
]

exports['Morpheme 함수 정의 테스트 2'] = [
  {
    "type": "subject",
    "tokenIndex": {
      "start": 0,
      "end": 1
    },
    "subject": {
      "type": "identifier",
      "tokenIndex": {
        "start": 0,
        "end": 1
      },
      "index": {
        "start": 0,
        "end": 2
      },
      "name": "콘솔"
    },
    "endType": "은",
    "index": {
      "start": 0,
      "end": 3
    }
  },
  {
    "type": "argument",
    "tokenIndex": {
      "start": 1,
      "end": 3
    },
    "names": [
      "을",
      "를"
    ],
    "index": {
      "start": 4,
      "end": 6
    }
  },
  {
    "type": "identifier",
    "tokenIndex": {
      "start": 3,
      "end": 4
    },
    "name": "출력한다를",
    "index": {
      "start": 7,
      "end": 12
    }
  },
  {
    "type": "keyword",
    "index": {
      "start": 13,
      "end": 17
    },
    "name": "function_define"
  },
  {
    "type": "operator",
    "index": {
      "start": 17,
      "end": 18
    },
    "operator": ","
  }
]

exports['Morpheme 틀 테스트 1'] = [
  {
    "type": "grammar",
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

exports['Morpheme 틀 테스트 2'] = [
  {
    "type": "named",
    "subject": {
      "type": "identifier",
      "tokenIndex": {
        "start": 0,
        "end": 1
      },
      "index": {
        "start": 0,
        "end": 2
      },
      "name": "사람"
    },
    "tokenIndex": {
      "start": 0,
      "end": 1
    },
    "name": "이라는",
    "index": {
      "start": 0,
      "end": 5
    }
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
