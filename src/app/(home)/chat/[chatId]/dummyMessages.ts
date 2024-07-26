export const messages = [
  { sender: "user", content: "안녕 오늘의 날씨를 알려줘" },
  {
    sender: "bot",
    content:
      "오늘 서울의 날씨는 오후에 가벼운 소나기가 예상되며, 저녁이 되면 구름이 조금 걷히면서 부분적으로 맑아질 것입니다...",
  },
  { sender: "user", content: "Can you show me a simple Python function?" },
  {
    sender: "bot",
    content:
      "Sure! Here's a simple Python function that calculates the factorial of a number:\n\n```python\ndef factorial(n):\n    if n == 0 or n == 1:\n        return 1\n    else:\n        return n * factorial(n-1)\n\n# Example usage\nprint(factorial(5))  # Output: 120\n```\n\nThis function uses recursion to calculate the factorial.",
  },
  {
    sender: "user",
    content:
      "오늘 서울의 날씨는 오후에 가벼운 소나기가 예상되며, 저녁이 되면 구름이 조금 걷히면서 부분적으로 맑아질 것입니다...",
  },
  {
    sender: "bot",
    content:
      "오늘 서울의 날씨는 오후에 가벼운 소나기가 예상되며, 저녁이 되면 구름이 조금 걷히면서 부분적으로 맑아질 것입니다...",
  },
  { sender: "user", content: "마크다운 기능을 시험해보고 싶어." },
  {
    sender: "bot",
    content:
      "# 마크다운 기능 예시\n\n- 리스트 아이템 1\n- 리스트 아이템 2\n- 리스트 아이템 3\n\n위 예시처럼 마크다운을 사용할 수 있습니다.",
  },
  {
    sender: "bot",
    content: ` # 안녕하세요! \n 저는 현재 리액트에서 \`react-markdown\`를 이용하여 **마크다운**을 랜더링하고 있습니다.
    `,
  },
];
