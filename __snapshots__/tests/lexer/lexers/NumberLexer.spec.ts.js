exports['NumberLexer 매치 되는 경우 2진수일 때 1'] = {
  "type": "number",
  "index": {
    "start": 0,
    "end": 6
  },
  "radix": 2,
  "number": 9
}

exports['NumberLexer 매치 되는 경우 음수인 2진수일 때 1'] = {
  "type": "number",
  "index": {
    "start": 0,
    "end": 7
  },
  "radix": 2,
  "number": -9
}

exports['NumberLexer 매치 되는 경우 8진수일 때 1'] = {
  "type": "number",
  "index": {
    "start": 0,
    "end": 4
  },
  "radix": 8,
  "number": 53
}

exports['NumberLexer 매치 되는 경우 음수인 8진수일 때 1'] = {
  "type": "number",
  "index": {
    "start": 0,
    "end": 5
  },
  "radix": 8,
  "number": -53
}

exports['NumberLexer 매치 되는 경우 o가 없는 8진수일 때 1'] = {
  "type": "number",
  "index": {
    "start": 0,
    "end": 3
  },
  "radix": 8,
  "number": 53
}

exports['NumberLexer 매치 되는 경우 o가 없는 음수인 8진수일 때 1'] = {
  "type": "number",
  "index": {
    "start": 0,
    "end": 4
  },
  "radix": 8,
  "number": -53
}

exports['NumberLexer 매치 되는 경우 10진수일 때 1'] = {
  "type": "number",
  "index": {
    "start": 0,
    "end": 2
  },
  "radix": 10,
  "number": 10
}

exports['NumberLexer 매치 되는 경우 음수인 10진수일 때 1'] = {
  "type": "number",
  "index": {
    "start": 0,
    "end": 3
  },
  "radix": 10,
  "number": -10
}

exports['NumberLexer 매치 되는 경우 10진수 실수형일 때 1'] = {
  "type": "number",
  "index": {
    "start": 0,
    "end": 6
  },
  "radix": 10,
  "number": 10.132
}

exports['NumberLexer 매치 되는 경우 음수인 10진수 실수형일 때 1'] = {
  "type": "number",
  "index": {
    "start": 0,
    "end": 7
  },
  "radix": 10,
  "number": -10.132
}

exports['NumberLexer 매치 되는 경우 16진수일 때 1'] = {
  "type": "number",
  "index": {
    "start": 0,
    "end": 6
  },
  "radix": 16,
  "number": 16895
}

exports['NumberLexer 매치 되는 경우 음수인 16진수일 때 1'] = {
  "type": "number",
  "index": {
    "start": 0,
    "end": 7
  },
  "radix": 16,
  "number": -16895
}

exports['NumberLexer 매치 되는 경우 0일 때 1'] = {
  "index": {
    "start": 0,
    "end": 1
  },
  "number": 0,
  "radix": 10,
  "type": "number"
}

exports['NumberLexer 매치 되지 않을 때 0z를 적었을 때 1'] = {
  "index": {
    "start": 0,
    "end": 1
  },
  "number": 0,
  "radix": 10,
  "type": "number"
}
