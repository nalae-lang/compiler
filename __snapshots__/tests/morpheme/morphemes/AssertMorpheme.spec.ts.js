exports['AssertMorpheme 매치 되는 경우 \'사람이다.\'일 때 1'] = {
  "type": "assert",
  "value": {
    "type": "identifier",
    "name": "사람",
    "index": {
      "start": 0,
      "end": 2
    },
    "tokenIndex": {
      "start": 0,
      "end": 1
    }
  },
  "tokenIndex": {
    "start": 0,
    "end": 1
  },
  "index": {
    "start": 0,
    "end": 4
  }
}

exports['AssertMorpheme 매치 되는 경우 \'바다다\'일 때 1'] = {
  "type": "assert",
  "value": {
    "type": "identifier",
    "name": "바다",
    "index": {
      "start": 0,
      "end": 2
    },
    "tokenIndex": {
      "start": 0,
      "end": 1
    }
  },
  "tokenIndex": {
    "start": 0,
    "end": 1
  },
  "index": {
    "start": 0,
    "end": 3
  }
}

exports['AssertMorpheme 매치 되는 경우 \'바다이다\'일 때 1'] = {
  "type": "assert",
  "value": {
    "type": "identifier",
    "name": "바다",
    "index": {
      "start": 0,
      "end": 2
    },
    "tokenIndex": {
      "start": 0,
      "end": 1
    }
  },
  "tokenIndex": {
    "start": 0,
    "end": 1
  },
  "index": {
    "start": 0,
    "end": 4
  }
}

exports['AssertMorpheme 매치 되는 경우 \'3이다\'일 때 1'] = {
  "type": "assert",
  "value": {
    "type": "number",
    "index": {
      "start": 0,
      "end": 1
    },
    "number": 3
  },
  "tokenIndex": {
    "start": 0,
    "end": 2
  },
  "index": {
    "start": 0,
    "end": 2
  }
}

exports['AssertMorpheme 매치 되는 경우 \'4다\'일 때 1'] = {
  "type": "assert",
  "value": {
    "type": "number",
    "index": {
      "start": 0,
      "end": 1
    },
    "number": 4
  },
  "tokenIndex": {
    "start": 0,
    "end": 2
  },
  "index": {
    "start": 0,
    "end": 1
  }
}

exports['AssertMorpheme 매치 되는 경우 \'"가나다라"이다\'일 때 1'] = {
  "type": "assert",
  "value": {
    "type": "string",
    "index": {
      "start": 0,
      "end": 4
    },
    "string": "가나다라"
  },
  "tokenIndex": {
    "start": 0,
    "end": 2
  },
  "index": {
    "start": 0,
    "end": 2
  }
}

exports['AssertMorpheme 매치 되는 경우 \'`new Date()`이다\'일 때 1'] = {
  "type": "assert",
  "value": {
    "type": "rawcode",
    "index": {
      "start": 0,
      "end": 10
    },
    "code": "new Date()"
  },
  "tokenIndex": {
    "start": 0,
    "end": 2
  },
  "index": {
    "start": 0,
    "end": 2
  }
}
