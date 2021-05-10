FROM openjdk:8-jdk-alpine
FROM tomcat:latest

VOLUME /tmp
ADD tsis-0.0.1.jar /usr/local/tomcat/webapps/
# ADD /usr/local/tomcat/webapps/tsis-0.0.1.jar app.jar 
EXPOSE 8080

ENV JAVA_OPTS=""
# ENTRYPOINT ["java","-jar","/app.jar"]
CMD ["catalina.sh", "run"]
#test