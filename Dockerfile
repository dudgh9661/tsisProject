# FROM openjdk:8-jdk-alpine
# FROM maven:3-alpine
# VOLUME /tmp
# RUN mvn -B -DskipTests clean package
# # ADD ./target/tsis-0.0.1.jar app.jar
# # ENV JAVA_OPTS=""
# # ENTRYPOINT ["java","-jar","/app.jar"]
FROM openjdk:8-jdk-alpine
VOLUME /tmp
ADD target/tsis-0.0.1.jar app.jar
ENV JAVA_OPTS=""
ENTRYPOINT ["java","-jar","/app.jar"]