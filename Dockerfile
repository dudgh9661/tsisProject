FROM openjdk:8-jdk-alpine
FROM tomcat:latest

VOLUME /tmp
ADD target/tsis-0.0.1.jar app.jar
ADD app.jar /usr/local/tomcat/webapps/
EXPOSE 8080

ENV JAVA_OPTS=""
# ENTRYPOINT ["java","-jar","/app.jar"]
CMD ["tsis.sh", "run"]