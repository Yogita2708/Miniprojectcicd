pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'yogitaagarwal20076/quiz-app:latest'
        EC2_HOST = '100.53.7.19'
        PEM_FILE = 'C:\\Users\\Public\\quiz.pem'
    }

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

        stage('Stop Old Container (Local)') {
            steps {
                bat 'docker stop quiz-container || echo not running'
                bat 'docker rm quiz-container || echo not exists'
            }
        }

        stage('Run Container (Local Test)') {
            steps {
                bat 'docker run -d -p 5000:3000 --name quiz-container %DOCKER_IMAGE%'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                bat 'docker push %DOCKER_IMAGE%'
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                bat '''
ssh -o StrictHostKeyChecking=no -i "%PEM_FILE%" ubuntu@%EC2_HOST% ^
"sudo docker pull %DOCKER_IMAGE% && ^
sudo docker stop quiz-app || echo stop-failed && ^
sudo docker rm quiz-app || echo rm-failed && ^
sudo docker run -d -p 80:3000 --name quiz-app %DOCKER_IMAGE%"
'''
            }
        }
    }
}