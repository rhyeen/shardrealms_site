let testCases = [
  {
    name: 'test 1 - all symbols',
    encodedMessage: 'lslclu||aoyll||adluafzpe||alu||upulallu||zlclu||zpe||upul||adv||adluafaoyll||adv||mvby||mpmallu||zlcluallu||adluafmpcl||zlclu',
    decodedMessage: 'eleven three twentysix ten nineteen seven six nine two twentythree two four fifteen seventeen twentyfive seven',
  },
  {
    name: 'test 2 - all numbers',
    encodedMessage: '11|3|26|10|19|7||6|9|2||23|2||4|15|17|25|7',
    decodedMessage: 'wolves run in packs'
  },
  {
    name: 'test 3 - both word types',
    encodedMessage: 'dkwzobsxq||2|14|25|13||25|13|10||xkdebkv||myebco||20|19|17|4||8|23|10|6|25|10|24||wyxcdobc',
    decodedMessage: 'tampering with the natural course only creates monsters'
  },
  {
    name: 'test 4 - mixed words',
    encodedMessage: 'b18|h9|r||7|u10||g14|p26|l||15|z||v8|c15|v1|z||13|y11|f||15|z||15|u11|c15|a7|i18|l',
    decodedMessage: 'Ulack and Zhite is obvious grey is inevitable',
  }
];
