package com.example.myapp;

import org.junit.Before;



import org.junit.Test;



import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;



import org.springframework.security.crypto.factory.PasswordEncoderFactories;



import org.springframework.security.crypto.password.*;








import java.util.HashMap;



import java.util.Map;








import static org.assertj.core.api.Assertions.assertThat;








public class PasswordEncoderTest {








    private PasswordEncoder passwordEncoder;








    @Before



    public void setUp() throws Exception {



        passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();



    }








    @Test



    public void encode() {



        String password = "abc";








        String encPassword = passwordEncoder.encode(password);

        String pass = "abc";

        System.out.println(encPassword);








        assertThat(passwordEncoder.matches(pass, encPassword)).isTrue();



        assertThat(encPassword).contains("{bcrypt}");



    }








    @Test



    public void match() {



        String password = "aaa";



       // String encPassword1 = "{pbkdf2}7a07c208fc2a407fb89cc3b6effb1b759da575a85f65dda9cd426f1ad14b56e6afaeeea6f9269569";



        String encPassword2 = "{bcrypt}$2a$10$TaEOy5rrnegLSRa8iw5YwOPGA8CdTm2StfoK6Q8770eB87G9jpBnm";



      //  String encPassword3 = "{sha256}fcef9e3f82af42d9059e74a95c633fe99b7aba1c4bfb9ac1cae31dd1b67060da933776fee8baec8f";








      //  assertThat(passwordEncoder.matches(password, encPassword1)).isTrue();



        assertThat(passwordEncoder.matches(password, encPassword2)).isTrue();



      //  assertThat(passwordEncoder.matches(password, encPassword3)).isTrue();



    }


















    @Test(expected = IllegalArgumentException.class)



    public void 사용한_비밀번호변환기_접두사가없으면오류발생() {



        String password = "password";



        String encPassword1 = "7a07c208fc2a407fb89cc3b6effb1b759da575a85f65dda9cd426f1ad14b56e6afaeeea6f9269569";   // pbkdf2



        String encPassword2 = "$2a$10$Ot44NE6k1kO5bfNHTP0m8ejdpGr8ooHGT90lOD2/LpGIzfiS3p6oq";                       // bcrypt



        String encPassword3 = "fcef9e3f82af42d9059e74a95c633fe99b7aba1c4bfb9ac1cae31dd1b67060da933776fee8baec8f";   // sha256








        assertThat(passwordEncoder.matches(password, encPassword1)).isTrue();



        assertThat(passwordEncoder.matches(password, encPassword2)).isTrue();



        assertThat(passwordEncoder.matches(password, encPassword3)).isTrue();



    }








    @Test



    public void 암호변환기ID가_없는경우는_다음과같이() {



        String password = "password";



        String encPassword = "$2a$10$Ot44NE6k1kO5bfNHTP0m8ejdpGr8ooHGT90lOD2/LpGIzfiS3p6oq";                       // bcrypt








        DelegatingPasswordEncoder delegatingPasswordEncoder = (DelegatingPasswordEncoder) PasswordEncoderFactories.createDelegatingPasswordEncoder();



        delegatingPasswordEncoder.setDefaultPasswordEncoderForMatches(new BCryptPasswordEncoder());








        assertThat(delegatingPasswordEncoder.matches(password, encPassword)).isTrue();



    }








    @Test



    public void customDelegatingPasswordEncoder() {



        Map<String, PasswordEncoder> encoders = new HashMap<>();



        String idForEncode = "bcrypt";



        encoders.put(idForEncode, new BCryptPasswordEncoder());



        encoders.put("noop", NoOpPasswordEncoder.getInstance());



        encoders.put("pbkdf2", new Pbkdf2PasswordEncoder());



        encoders.put("sha256", new StandardPasswordEncoder());








        passwordEncoder = new DelegatingPasswordEncoder(idForEncode, encoders);








        String password = "password";



        String encPassword = passwordEncoder.encode(password);



        System.out.println(encPassword);








        assertThat(passwordEncoder.matches(password, encPassword)).isTrue();








        String encPassword1 = "{pbkdf2}7a07c208fc2a407fb89cc3b6effb1b759da575a85f65dda9cd426f1ad14b56e6afaeeea6f9269569";



        String encPassword2 = "{bcrypt}$2a$10$Ot44NE6k1kO5bfNHTP0m8ejdpGr8ooHGT90lOD2/LpGIzfiS3p6oq";



        String encPassword3 = "{sha256}fcef9e3f82af42d9059e74a95c633fe99b7aba1c4bfb9ac1cae31dd1b67060da933776fee8baec8f";








        assertThat(passwordEncoder.matches(password, encPassword1)).isTrue();



        assertThat(passwordEncoder.matches(password, encPassword2)).isTrue();



        assertThat(passwordEncoder.matches(password, encPassword3)).isTrue();



    }



}
