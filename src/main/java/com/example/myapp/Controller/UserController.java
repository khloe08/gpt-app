package com.example.myapp.Controller;

import com.example.myapp.Service.CustomOAuth2UserService;
import com.example.myapp.Service.UserService;

import com.example.myapp.domain.*;
import com.example.myapp.repository.CustomUserRepositoryImpl;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.web.bind.annotation.*;


@RestController
@Slf4j
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private CustomOAuth2UserService customService;
    @Autowired
    private UserService userService;

    @Autowired
    private final CustomUserRepositoryImpl customUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private final HttpSession httpSession;

    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;


   /* @PostMapping("login")
    public String login(@RequestBody Map<String, String> params) {
        User user = userservice.findByEmail(params.get("email"));
        if (user == null || !passwordEncoder.matches(params.get("password"), user.getPassword())) {
            throw new RuntimeException("유효하지 않은 사용자 이름 또는 비밀번호입니다.");
        }
        return "로그인 성공!";
    }


    @PostMapping("register")
    public User register(@RequestBody Map<String, String> params) {
        return userservice.registerUser(params.get("email"), params.get("password"));
    }


    @GetMapping("user")
    public String user(Model model) {
        SessionUser loginUser = (SessionUser) httpSession.getAttribute("loginUser");
        model.addAttribute("user", loginUser);
        return "/user";
    }

    @GetMapping("guest")
    public String guest(Model model) {

        SessionUser loginUser = (SessionUser) httpSession.getAttribute("loginUser");
        model.addAttribute("user", loginUser);
        return "/guest";
    }
*/
    @PostMapping("/sign-in")
    public JwtToken signIn(@RequestBody SignInDto signInDto) {
        String username = signInDto.getUsername();
        String password = signInDto.getPassword();
        JwtToken jwtToken = userService.signIn(username, password);
        log.info("request username = {}, password = {}", username, password);
        log.info("jwtToken accessToken = {}, refreshToken = {}", jwtToken.getAccessToken(), jwtToken.getRefreshToken());
        return jwtToken;
    }


    @PostMapping("/sign-up")
    public ResponseEntity<UserDto> signUp(@RequestBody SignUpDto signUpDto) {
        UserDto savedMemberDto = userService.signUp(signUpDto);
        return ResponseEntity.ok(savedMemberDto);
    }


    @PostMapping("/test")
    public String test() {
        return "success";
    }



    /*@PostMapping("/naverlogins")
    public Object naverprofile( @RequestBody Map<String, String> params, HttpSession session) {

        //    log.info("params >>> " + params.toString());  //{access_token=AAAAOK3YZUQo0huTlz-hhCJuoC8c2oqBXuNgug8SJ9b9hKMAVsrDbQFrZ1ZEsW2pGT6hw3ouHoNIF2x1BYfjUcqtDWQ, state=4b53e1ff-4b37-44f4-b857-eb93287b5f70, token_type=bearer, expires_in=3600}
        //    log.info(params.get("access_token"));

        String token = params.get("access_token"); // 네이버 로그인 접근 토큰
        String header = "Bearer " + token; // Bearer 다음에 공백 추가
        String apiURL = "https://openapi.naver.com/v1/nid/me";

        try {
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Authorization", header);
            con.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

            int responseCode = con.getResponseCode();
            BufferedReader br;

            if (responseCode == 200) { // 정상 호출
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {  // 에러 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();

            if(responseCode==200) {
                System.out.println(response.toString());
            }

            String apiResult = response.toString();
            ObjectMapper objectMapper =new ObjectMapper();

            Map<String, Object> apiJson = (Map<String, Object>)objectMapper.readValue(apiResult, Map.class).get("response");

            String nickname = (String) apiJson.get("nickname");
            String email =  (String) apiJson.get("email");
            String password =  (String) apiJson.get("id");
            String link = email.contains("@naver.com") ? "naver" : "other";


            User user = userservice.findByEmail(email);

            if (user == null) {
                User member = new User();
                member.setName(nickname);
                member.setEmail(email);
                member.setPassword(password);
                member.setLink(link);

                userservice.registerOut(member);
            }

            if (user != null && !user.getLink().equals("naver")) {
                //        log.info("artify 회원이 네이버 계정으로 접속 시도함!");

                return ResponseEntity.badRequest();
            }



            return ResponseEntity.ok(response);





        } catch (Exception e) {
            log.error("네이버 로그인 중 에러 발생! : " + e);

            return ResponseEntity.badRequest();
        }


    }*/


}

