exports['PropertyMorpheme 매치 되는 경우 \'사람의\'일 때 1'] = {
  "type": "property",
  "index": {
    "start": 0,
    "end": 3
  },
  "tokenIndex": {
    "start": 0,
    "end": 1
  },
  "object": {
    "type": "identifier",
    "index": {
      "start": 0,
      "end": 2
    },
    "tokenIndex": {
      "start": 0,
      "end": 1
    },
    "name": "사람"
  }
}

exports['PropertyMorpheme 매치 되는 경우 \'3의\'일 때 1'] = {
  "type": "property",
  "index": {
    "start": 0,
    "end": 1
  },
  "tokenIndex": {
    "start": 1,
    "end": 2
  },
  "object": {
    "type": "number",
    "index": {
      "start": 0,
      "end": 1
    },
    "number": 3
  }
}

exports['PropertyMorpheme 매치 되는 경우 \'"문자열"의\'일 때 1'] = {
  "type": "property",
  "index": {
    "start": 0,
    "end": 1
  },
  "tokenIndex": {
    "start": 1,
    "end": 2
  },
  "object": {
    "type": "string",
    "index": {
      "start": 0,
      "end": 3
    },
    "string": "문자열"
  }
}

exports['PropertyMorpheme 매치 되는 경우 \'`new Date()`의\'일 때 1'] = {
  "type": "property",
  "index": {
    "start": 0,
    "end": 1
  },
  "tokenIndex": {
    "start": 1,
    "end": 2
  },
  "object": {
    "type": "rawcode",
    "index": {
      "start": 0,
      "end": 10
    },
    "code": "new Date()"
  }
}
