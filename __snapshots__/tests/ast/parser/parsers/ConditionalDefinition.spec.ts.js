exports['ConditionalDefinition 매치될 때 \'키가 30이상이면,\' 일 때 1'] = {
  "type": "conditional_expression",
  "leftValue": {
    "type": "identifier",
    "tokenIndex": {
      "start": 0,
      "end": 1
    },
    "index": {
      "start": 0,
      "end": 1
    },
    "name": "키"
  },
  "rightValue": {
    "type": "number",
    "index": {
      "start": 0,
      "end": 2
    },
    "number": 30
  },
  "operator": ">=",
  "tokenIndex": {
    "start": {
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
          "end": 1
        },
        "name": "키"
      },
      "endType": "가",
      "index": {
        "start": 0,
        "end": 2
      }
    },
    "end": {
      "type": "operator",
      "index": {
        "start": 0,
        "end": 1
      },
      "operator": ","
    }
  },
  "index": {
    "start": 0,
    "end": 1
  }
}
