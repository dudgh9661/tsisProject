pipeline {
    agent none
    options { skipDefaultCheckout(true) }
    stages {
        stage('Build and Test') {
            agent {
                docker {
                    image 'maven'
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
                sh 'docker build -t tsis-image:latest .'
            }
        }
        stage('Docker run') {
            agent any
            steps {
                sh 'docker ps -f name=tsis-container -q | xargs --no-run-if-empty docker container stop'
                sh 'docker container ls -a -fname=tsis-container -q | xargs -r docker container rm'
                sh 'docker rmi $(docker images -f "dangling=true" -q)'
                sh 'docker run -d --name tsis-container -p 8080:8080 tsis:latest'
            }
        }
    }
}
