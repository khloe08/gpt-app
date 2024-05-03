import React, { useEffect } from 'react'; 

const { naver } = window;

const NaverLogin = () => {

  const client_id = "LArv9FCX7yU8cb6OhUUR"; // 발급 받은 Client ID 입력
  const redirect_uri = "http://localhost:3000/auths/naverlogin"; // 작성했던 Callback URL 입력
  const naverSecret = "7J4CI2ykV1";
  const code = "code";

  const initializeNaverLogin = () => {
  // 네이버 로그인 기능 및 버튼 구현
  const naverLogin = new naver.LoginWithNaverId({
    response_type: code,
    clientId: client_id,  // Naver Developer 에 있는 Client ID
    callbackUrl: redirect_uri,  // 요청 보냈을때 네이버에서 응답해 줄 주소
    clientSecret: naverSecret,
    isPopup: false,  // 네이버 로그인 확인 창을 팝업으로 띄울지 여부
    loginButton: {
      color: "green", // green, white
      type: 3, // 1: 작은버튼, 2: 중간버튼, 3: 큰 버튼
      height: 50, // 크기는 높이로 결정한다.
    },
  });
  naverLogin.init();
};

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return (
    <>
      {/* 로그인 버튼 요청 URI
      https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id="************";&state=74075dc6-cfeb-40f9-87c5-d144e34a3983&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2FnaverLogin&version=js-2.0.0&svctype=1
      응답
      http://localhost:3000/auth/naverLogin#access_token=AAAAOJVd5J9VsZr4FoB************&state=74075dc6-cfeb-40f9-87c5-d144e34a3983&token_type=bearer&expires_in=3600 */}
      <div id="naverIdLogin"/>
    </>
  );
};
export default NaverLogin;