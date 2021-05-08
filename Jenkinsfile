pipeline {
    agent none
    options { skipDefaultCheckout(true) }
    stages {
        stage('Build and Test') {
            agent {
                docker {
                    image 'maven:3-alpine'
                    args '-v /root/.m2:/root/.m2'
                }
            }
            options { skipDefaultCheckout(false) }
            steps {
                sh 'mvn -B -DskipTests clean package'
            }
        }
        stage('Docker build') {
            agent any
            steps {
                sh 'docker build -t tsis:latest .'
            }
        }
        stage('Docker run') {
            agent any
            steps {
                sh 'docker ps -f name=server -q | xargs --no-run-if-empty docker container stop'
                sh 'docker container ls -a -fname=server -q | xargs -r docker container rm'
                sh 'docker rmi $(docker images "dangling=true")'
                sh 'docker run -d --name tsis-container -p 8080:8080 tsis:latest'
            }
        }
    }
}
