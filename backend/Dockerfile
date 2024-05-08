FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

COPY target/*.jar app.jar
COPY src/main/resources/prod.application.properties application.properties

ENTRYPOINT ["java", "-jar", "app.jar"]