# API Fetching Strategy 연습문제

1. 제시된 Open API를 활용해서 다음의 같은 화면을 만들어 주세요.

   ![tobe_01](tobe_01.png)

   - [API Documentation]('https://dog.ceo/dog-api/documentation/breed')
   - 다른 품종(Breed)의 강아지 3마리씩 보여줍니다.
   - 쿼리 값은 상수로 제공되며, 자유롭게 변경할 수 있습니다.

2. API Caching 을 도입해 필요할 때만 새로운 데이터를 가져오도록 해봅시다.

   ![tobe_02](tobe_02.gif)

   - API 호출 결과를 캐싱 처리 합니다.
   - Cache 리셋 기능을 추가하여 리셋 후 호출에 새로운 데이터를 받아오도록 합니다.
   - UI 는 첨부된 화면을 참고하되, 자유롭게 제작할 수 있습니다.

3. Cache Revalidation 을 추가해 봅시다.

   ![tobe_03](tobe_03.gif)

   - API 캐싱 유효시간 설정을 추가합니다. (예시는 3초 설정)
   - 설정된 유효시간이 지나가면 캐시 데이터를 갱신합니다.
   - 아래의 라이브러리와 그 예시는 연습 문제 풀이에 도움이 될 수 있습니다.
   - https://day.js.org/docs/en/query/is-after

4. 이제 React Query 사용해 같은 기능을 구현해 봅시다.

   ![tobe_04](tobe_04.gif)

   - React Query 를 이용해 좀 더 디테일한 캐싱 설정을 실습해 봅시다.
   - 몇 초 (예시는 1초) 이후의 캐싱은 오래된 데이터로 설정해 주세요.
   - 몇 초 (예시는 1초) 이후 브라우저에 다시 포커싱하면 새로운 데이터로 업데이트 처리 해주세요.
