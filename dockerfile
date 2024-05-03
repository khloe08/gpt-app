#!/bin/bash

# base 이미지 설정
FROM openjdk:17

WORKDIR /backend

# 실행 명령어
CMD ["./mvnw", "clean", "package"]

VOLUME /tmp

ARG JAR_FILE_PATH=target/*.jar

COPY ${JAR_FILE} app.jar

# 외부 호스트 8080 포트로 노출
EXPOSE 8080

ENTRYPOINT ["java","-jar","/app.jar"]
