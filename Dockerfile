FROM openjdk:8-jdk-alpine
# FROM tomcat:latest

# VOLUME /tmp
# ADD tsis-0.0.1.jar /usr/local/tomcat/webapps/
# ADD /usr/local/tomcat/webapps/tsis-0.0.1.jar app.jar 
# EXPOSE 8085

# ENV JAVA_OPTS=""
ADD tsis-0.0.1.war app.war
# ENTRYPOINT ["java","-jar","app.jar"]
ENTRYPOINT ["java","-war","app.war"]
# CMD ["catalina.sh", "run"]
# test 111111111