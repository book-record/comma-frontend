# 📖 쉼표

`#책` `#기록` `#음성` `#추억`

### 감상평 이제 목소리로 듣고 책에 대한 기록을 보내보자

<br/>

# Contents

- [✨ 동기](#동기)
- [📖 쉼표](#쉼표)
- [🔗 배포링크](#배포링크)
- [⚙️ 설치법](#%EF%B8%8F설치법)
- [🛠️ 기술스택](%EF%B8%8F기술스택)
- [⏰ 작업기간](#작업기간)
- [🚨 리뷰](#리뷰)
- [🖋마지막으로](#마지막으로)

<br />

# ✨동기

- 학생 시절에 책을 많이 읽었었던 기억이 있습니다. 다양한 장르들의 책들과 함께 밤을 지새우며 시간을 보낸 적도 있었습니다.

- 책을 읽고 난 뒤, 메모지에 기록을 해놨지만 시간이 지난 후 그 책에 대한 기록들을 찾고 싶어도 잃어버려서 찾지 못한 적이 많았었습니다.

- 내가 읽었던 책의 내용도 기록 하고, 다른 누군가에게 내가 읽었었던 책에 대해서도 감상평을 공유 할 수 있으면 더 좋을 것 같다라는 생각으로 프로젝트를 기획했습니다.

<br />

# 📖쉼표

<h4>한줄평페이지</h4>
<img width="1437" alt="스크린샷 2022-03-18 20 36 38" src="https://user-images.githubusercontent.com/80472881/158996755-81c8ca23-452e-49e6-aa36-b60ae072d458.png">

- 한줄평 페이지에서는 다른 사용자들이 등록한 책을 볼 수 있습니다.
  <br />
  <br />

<h4>책 등록페이지</h4>
<img width="1437" alt="스크린샷 2022-03-18 20 37 20" src="https://user-images.githubusercontent.com/80472881/158996816-f605843e-ea75-40c0-89bc-63bef3dcee42.png">

- 사용자는 책 제목을 통해 책을 찾을 수 있고, 책 등록 페이지에 책을 등록 할 수 있습니다.
  <br />
  <br />

<h4>한줄평 등록 페이지
<img width="1437" alt="스크린샷 2022-03-18 20 37 43" src="https://user-images.githubusercontent.com/80472881/158996860-9eaa09ed-b3d8-4b00-b96c-6a177a07a6ac.png">

- 사용자는 책에 대한 감상평을 음성으로 남길 수 있습니다. 본인의 목소리를 들을 수 있고,
  20초내에 기록을 남길 수 있고 저장할 수 있습니다.
  <br />
  <br />

<h4>사용자가 책에 대해 한줄평 등록 후 페이지
<img width="1437" alt="스크린샷 2022-03-18 20 38 11" src="https://user-images.githubusercontent.com/80472881/158996896-c1924ce8-35e8-464b-b4a3-0e160c4bb492.png">

- 사용자는 다른 사용자들이 남긴 책에 대한 감상평을 들을 수 있습니다. 한 감상평 당 하나의 좋아요를 누를 수 있습니다. 좋아요가 많은 순서대로 한줄평은 나열됩니다.
  <br />
  <br />

<h4>타임캡슐 등록페이지
<img width="1437" alt="스크린샷 2022-03-18 20 38 33" src="https://user-images.githubusercontent.com/80472881/158996941-24096c17-e8f6-4235-8e69-4b1b6dcae4f1.png">

- 사용자는 책에 대한 독후감을 작성할 수 있습니다. 제목과 텍스트로 기록이 가능하며, 열람은 1년 후 가능합니다.
  <br />
  <br />

<h4>타임캡슐 페이지
<img width="1437" alt="스크린샷 2022-03-18 20 39 06" src="https://user-images.githubusercontent.com/80472881/158996979-d92c9887-fc16-4362-b8b3-bcbac96badfd.png">

- 사용자는 D-day가 되지 못한 책은 열어보지 못하고, D-day가 지난 책만 열람이 가능합니다.
  <br />
  <br />
  
  <h4>이메일
<img width="1437" alt="스크린샷 2022-03-18 20 43 13" src="https://user-images.githubusercontent.com/80472881/158997204-0c686a41-cf3a-459e-bc27-69429f425413.png">

- D-day가 된 날 이메일로 사용자에게 열람이 가능하다는 이메일이 발송됩니다.
  <br />
  <br />

# 🔗배포링크

- [yoran.cc](https://yoran.cc)
  

<br />

# ⚙️설치법

로컬에서 구동을 원하시면 아래와 같이 .env 파일 설정이 필요합니다.

## 1. Frontend

```jsx
REACT_APP_BASE_URL=http://localhost:8000
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=

REACT_APP_KAKAO_BOOK_SEARCH_API=
```

- FIREBASE 관련 키 값은 https://console.firebase.google.com 접속 후, 프로젝트 추가 후, 프로젝트 개요에서 웹 앱에 Firebase추가 시, 나오는 키 값을 입력해주세요.
- KAKAO 관련 키 값은 https://developers.kakao.com 로그인 후, 개발자 등록을 하고 난 뒤, 카카오 API 키를 발급 받을 수 있습니다. 그 후 키 값을 입력해주세요.
  <br />
  <br />

## 2. Backend

```jsx
MONGO_URL=
CORS_ORIGIN_URL=http://localhost:3000
JWT_SECRET="암호화시킬 문자열"
JWT_EXPIRES_IN_TIME="만료시간"

AWS_ACCESS_KET_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=

NODEMAILER_USER="본인의 이메일"
NODEMAILER_PASS="본인의 이메일 비밀번호"
```

- https://www.mongodb.com/ko-kr/cloud/atlas/efficiency Atlas 클러스터 생성 후 connect 된 값을 입력해주세요.
- AWS 회원가입 후, 내 보안 자격증명을 통해 Access Key Id와 Secret Access Key를 발급 받아서 입력해주세요.
- AWS S3 버킷 생성 후 해당 지역과 버킷이름을 입력해주세요.
  <br />
  <br />

# 🛠️기술스택

## Frontend

- React (CRA)
- Redux, Redux toolkit
- Styled-Components
- Google 로그인 (firebase)
- Test-Code
  - Jest
  - TestingLibrary

## Backend

- Node.js
- Express
- Mongo DB -Atlas (Database Management) / Mongoose
- REST API
- JWT (Authentication)
- AWS S3
- Jest

## Deployment

- Client - Netlify
- Server - AWS Elastic Beanstalk

<br />

# ⏰작업기간

본 프로젝트는 2022.2.21 ~ 3.13 총 3주간(20일) 진행 되었습니다.

- 1주차 : `기획 및 설계단계`
  - 아이디어 기획
  - [Mockup 작업](https://www.notion.so/668bf5c6c8a3470aadec31a6dd598017)
  - [DB schema modeling](https://www.notion.so/bf62c5d9255e42408a8c48e4c7602241)
  - [기술 스택 검증](https://www.notion.so/a7741c7121b944918d79e71eb241693b)
  - 칸반 작성
  - 개발 일정 스케쥴링
  - 개발 환경 셋업
- 2-3주차 : `개발단계`
  - google Firebase 로그인 및 JWT 토큰 로그인 구현
  - 주요 페이지 생성 및 엔드 포인트 작업
  - 사용자 음성 저장을 위한 AWS S3 연동
  - 카카오 책 API를 이용한 책 정보 검색
  - Nodemailer와 Node Schedule를 이용해 사용자에게 예약 이메일 발송
  - 테스트 코드 작성 및 배포

<br />

# 🚨리뷰

1. 국내 도서 검색 OPEN API를 조사하면서 생각보다 책 검색API가 많지 않았다. 대표 포털 사이트인 네이버와 카카오, 국립중앙도서관, 인터파크 등 서로의 장단점이 명확해서 어떤 API를 써야 될지 고민이 많았다. 네이버 같은 경우 도서 표지 이미지가 작았었고, 국립중앙도서관은 국립중앙도서관에 있는 책에 관해서 정보를 제공했기 때문에 선택지가 많지 않았다.
   <br/>

   카카오 책 API를 이용하면서 가장 불편했던 점은 문자열을 보내는데 책에 대한 contents가 자체적으로 잘려져서 넘어온다. 그런데 그 부분이 어떨 때는 짤려진 상태로 짧게 넘어오는 상황이 발생했다. 또한 contents가 중간 중간 이상한 문자열이 껴있는 상태에서 넘어왔어서 일일이 대응하지 못한 점이 아쉬움이 남는다.
<br/>

2.  좋아요 버튼은 사용자가 좋아요를 클릭 시 빨간하트로 바뀌고, 만약 좋아요를 취소한다면 빈 하트가 나오도록 로직을 구현했다. 하지만 리렌더링이 2-3번이 일어나는 버그가 발생했다. 그리고 좋아요가 0인 하트를 빠르게 누르면 1과 0만 나와야되는데 그 이상의 숫자가 나오는 버그가 발생했다.
    <br/>

    페이지를 만들면서 가장 힘들었던 부분이 좋아요 부분이였다. 사용자가 좋아요를 누르고 그 좋아요 숫자에 따라 한줄평의 위치가 달라지기 때문에 useEffect 의존성 배열에 값을 적절하게 잘 넣어줬어야 했었다. 처음에는 useEffect 의존성 배열 처리를 잘못 해주어서 리렌더링이 되지 않았었다. 그래서 좋아요 숫자가 다른 상대방끼리 역전을 해도, 반응하지 않았다. 그래서 하트를 클릭했을 때, 리렌더링을 시켜주면서 숫자를 비교해서 서로의 위치는 바뀌었지만 그 결과 리렌데링을 한 번이 아닌, 그 이상으로하게 되었다.

    그 이상의 숫자가 나오는 버그 같은 경우에는 좋아요를 업데이트 하는 과정에서 사용자가 빠르게 하트를 클릭 시 api요청이 중복으로 발생하게 되면서 불필요한 딜레이와 맞물려 하트의 숫자가 갑자기 많아지는 버그가 발생한 것으로 보인다. 만약 saga를 이용해서 작업했다면, takeLatest 이벤트를 이용해서 가장 마지막 요청에 대한 데이터만 받아올 수 있기 때문에 버그를 해결 할 수 있을 것 같다. 추후 saga를 이용해 변경할 예정이다.
<br/>

3.  사용자가 독후감을 작성하고, 일정 시간 후 예약된 시간에 해당 이메일로 잘 도착하는 것을 확인했다. 그런데 프로젝트 막바지에 서버가 만약 중간에 꺼진다면 어떻게 될까를 실험했을 때, 기존에 예약으로 걸어 놓았던 이메일 발송에 대한 예약들이 사라지게 되었다. 초기 예약이메일을 사용하기 위한 후보는 3가지가 있었다.

    <br/>
    1)Agenda
    <br/>
    2)Node-cron
    <br/>
    3)Node-schedule
    <br/>
    <br/>

    위 세가지 경우 '크론 형식'을 기반으로 시간, 날짜, 요일을 설정하면 실행되는 모듈이다. Node-scheduled를 처음에 선택했던 이유는 가장 많이 다운로드 받은 수와 생각한 것처럼 예약이메일을 제 시간에 발송했다.

    그러나 위에서 말했던 것처럼 서버가 한 번 꺼지기라도 하면 이전에 기록이 사라지는 부분 때문에 다른 모듈인 Agenda에 대해 찾아보았다. 조사했던 모듈 중 다운로드 숫자가 적지만, 모듈을 유지하는 사람이 가장 많다. 또한 수정이 활발하게 이뤄지고 있다. 하지만 단점으로는 mongoDB가 필수이고, 오픈이슈가 너무 많이 발생한다는 점과 주간 다운로드 수도 현저히 적기 때문에 신뢰가 많이 가지 않았다. 그러나 서버가 꺼지는 일이 발생하더라도 예약된 이메일이 발송 될 수 있기 때문에 단점을 보완할 수 있다고 생각된다. 너무 뒤늦게 버그를 발생해서 수정하진 못했지만 추후 Node-scheduled를 Agenda로 변경할 예정이다.

    <br />

# 🖋마지막으로

- “과연 내가 할 수 있을까? 해야한다” 프로젝트를 하면서 매일 되새겼던 말이였습니다. 처음이였던 프로젝트를 꼭 해내고 싶은 마음이 컸습니다. 누구에게도 도움을 받을 수 없고 스스로 방법을 찾아서 스스로 해내야했기 때문에 더 많은 시간과 노력을 쏟았던 것 같습니다.
  <br />

- 개발자로써 아직 부족하다 생각되지만 부트캠프 기회를 통해 개발에 대해서, 개발자가 가져야 할 사항들에 대해서 배울 수 있었습니다. 부트캠프를 통해 동기분들과 그리고 함께 지지해주셨던 멘토분들 그리고 정신적 지주이신 켄님을 통해 개발에 대해서 그리고 좋은 개발자로 나아갈 방향성을 잡아주신 덕분에 마지막 개인프로젝트까지 잘 마무리 한 것 같습니다. 더 좋은 개발자가 되기 위해 늘 마음에 새기며 더 나은 개발자가 될 수 있도록 노력하겠습니다.
