exports['SubstituteMorpheme 매치 되는 경우 \'사람으로\'일 때 1'] = {
  "type": "substitute",
  "tokenIndex": {
    "start": 0,
    "end": 1
  },
  "value": {
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
  "index": {
    "start": 0,
    "end": 4
  }
}

exports['SubstituteMorpheme 매치 되는 경우 \'바다로\'일 때 1'] = {
  "type": "substitute",
  "tokenIndex": {
    "start": 0,
    "end": 1
  },
  "value": {
    "type": "identifier",
    "tokenIndex": {
      "start": 0,
      "end": 1
    },
    "index": {
      "start": 0,
      "end": 2
    },
    "name": "바다"
  },
  "index": {
    "start": 0,
    "end": 3
  }
}

exports['SubstituteMorpheme 매치 되는 경우 \'3으로\'일 때 1'] = {
  "type": "substitute",
  "tokenIndex": {
    "start": 0,
    "end": 1
  },
  "value": {
    "type": "number",
    "index": {
      "start": 0,
      "end": 1
    },
    "number": 3
  },
  "index": {
    "start": 0,
    "end": 1
  }
}

exports['SubstituteMorpheme 매치 되는 경우 \'"문자열"로\'일 때 1'] = {
  "type": "substitute",
  "tokenIndex": {
    "start": 0,
    "end": 1
  },
  "value": {
    "type": "string",
    "index": {
      "start": 0,
      "end": 3
    },
    "string": "문자열"
  },
  "index": {
    "start": 0,
    "end": 3
  }
}

exports['SubstituteMorpheme 매치 되는 경우 \'`new Date()`로\'일 때 1'] = {
  "type": "substitute",
  "tokenIndex": {
    "start": 0,
    "end": 1
  },
  "value": {
    "type": "rawcode",
    "index": {
      "start": 0,
      "end": 10
    },
    "code": "new Date()"
  },
  "index": {
    "start": 0,
    "end": 10
  }
}
