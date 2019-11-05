exports['SubstituteMorpheme 매치 되는 경우 \'사람으로\'일 때 1'] = {
  "type": "substitute",
  "index": {
    "start": 0,
    "end": 4
  },
  "tokenIndex": {
    "start": 0,
    "end": 1
  },
  "value": {
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

exports['SubstituteMorpheme 매치 되는 경우 \'바다로\'일 때 1'] = {
  "type": "substitute",
  "index": {
    "start": 0,
    "end": 3
  },
  "tokenIndex": {
    "start": 0,
    "end": 1
  },
  "value": {
    "type": "identifier",
    "index": {
      "start": 0,
      "end": 2
    },
    "tokenIndex": {
      "start": 0,
      "end": 1
    },
    "name": "바다"
  }
}

exports['SubstituteMorpheme 매치 되는 경우 \'3으로\'일 때 1'] = {
  "type": "substitute",
  "index": {
    "start": 0,
    "end": 2
  },
  "tokenIndex": {
    "start": 1,
    "end": 2
  },
  "value": {
    "type": "number",
    "index": {
      "start": 0,
      "end": 1
    },
    "number": 3,
    "radix": 10
  }
}

exports['SubstituteMorpheme 매치 되는 경우 \'"문자열"로\'일 때 1'] = {
  "type": "substitute",
  "index": {
    "start": 0,
    "end": 2
  },
  "tokenIndex": {
    "start": 1,
    "end": 2
  },
  "value": {
    "type": "string",
    "index": {
      "start": 0,
      "end": 3
    },
    "string": "문자열"
  }
}

exports['SubstituteMorpheme 매치 되는 경우 \'`new Date()`로\'일 때 1'] = {
  "type": "substitute",
  "index": {
    "start": 0,
    "end": 2
  },
  "tokenIndex": {
    "start": 1,
    "end": 2
  },
  "value": {
    "type": "rawcode",
    "index": {
      "start": 0,
      "end": 10
    },
    "code": "new Date()"
  }
}
