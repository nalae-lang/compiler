exports['NumberLexer 매치 되는 경우 10진수일 때 1'] = {
  "type": "number",
  "number": 10,
  "index": {
    "start": 0,
    "end": 2
  }
}

exports['NumberLexer 매치 되는 경우 음수인 10진수일 때 1'] = {
  "type": "number",
  "number": -10,
  "index": {
    "start": 0,
    "end": 3
  }
}

exports['NumberLexer 매치 되는 경우 10진수 실수형일 때 1'] = {
  "type": "number",
  "number": 10.132,
  "index": {
    "start": 0,
    "end": 6
  }
}

exports['NumberLexer 매치 되는 경우 음수인 10진수 실수형일 때 1'] = {
  "type": "number",
  "number": -10.132,
  "index": {
    "start": 0,
    "end": 7
  }
}

exports['NumberLexer 매치 되는 경우 0일 때 1'] = {
  "type": "number",
  "number": 0,
  "index": {
    "start": 0,
    "end": 1
  }
}
