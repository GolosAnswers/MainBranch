FROM openjdk:8-jre-alpine
ADD target/project-2-0.0.1.jar project-2-0.0.1.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "project-2-0.0.1.jar"]
