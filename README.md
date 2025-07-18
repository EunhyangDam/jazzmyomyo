# 약어 가이드

LG => LoGin
MP => My Page
MM => Member Manage (회원관리)
CS => Customer Service (1:1 문의)

# 사이트맵

- About us

  - 재즈묘묘
  - 어바웃 묘묘
  - 인테리어
  - 스토리

- Shop

  - 굿즈
  - LP/CD

- Menu

  - Wine
  - Drinks
  - Platter $ Sdies
  - Set Menu
  - Pre-order

- Schedule

  - 월간 공연 캘린더
  - 공연 상세 안내
  - 아티스트, 게스트 소개
  - 티켓 예매
  - 대관 신청

- Community

  - 공지사항
    - 수정하기
    - 글쓰기
    - 삭제 모달
  - FAQ
  - SNS/뉴스레터(새소식) 구독

    - 수정하기
    - 글쓰기
    - 삭제 모달

  - 지난 공연 갤러리

    - 수정하기
    - 글쓰기
    - 삭제 모달

  - 한줄후기(이벤트 형식으로)

    - 수정하기
    - 글쓰기
    - 삭제 모달

  - 이벤트
    - 삭제

- 로그인/관리자(시은이)

  - 회원가입
  - 아이디/비번 찾기
  - 아이디/비번 찾기 결과페이지

- 마이페이지 (의연언니)

  - 주문내역
  - 회원정보 / 정보수정 / 탈퇴하기

- 회원관리(관리자) (하은언니)
- 장바구니(이은지)

---

- 1:1(문의는 이쪽이묘)(규린이)

# 컴포넌트

[src]
index.js
[components]
WrapComponent.jsx
[wrap]
TopModalComponent.jsx
HeaderComponent.jsx
MainComponent.jsx
[main] //메인페이지
[scss]
Section1Component.scss
.
.
.
Section8Component.scss
[sub] //서브메뉴 페이지 >[scss]

        [Sub01]  ABOUT US
         >[scss]
                Sub01ABOUT_US .jsx
                [Sub02]  SHOP
                      >[scss]
                    Sub02SHOP.jsx

                [Sub03]  MENU
                      >[scss]
                    Sub03MENU.jsx

                [Sub04]  SCHEDULE
                      >[scss]
                    Sub04SCHEDULE.jsx

                [Sub05]  COMMUNITY
                     >[scss]
                    Sub05COMMUNITY.jsx

                [Sub06LG]
                [Sub07MP]
                [Sub08MM]
                [Sub09Cart]
                [sub10CS]

          FooterComponent.jsx
          MainModalComponent.jsx
          ConfirmModalComponent.jsx

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
