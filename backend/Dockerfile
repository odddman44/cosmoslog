FROM amazoncorretto:21 AS build
WORKDIR /app

# Gradle wrapper & 설정
COPY gradlew ./
COPY gradle ./gradle
COPY build.gradle settings.gradle ./

# 소스
COPY src ./src

# backend 모듈의 bootJar만 생성
RUN chmod +x ./gradlew && ./gradlew clean bootJar -x test

FROM amazoncorretto:21
WORKDIR /app
COPY --from=build /app/build/libs/*.jar backend-api.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/backend-api.jar"]