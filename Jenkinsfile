pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "yogitaagarwal20076/quiz-app:latest"
        EC2_IP = "100.53.7.19"
        SSH_KEY = "C:\\Users\\Jai Ambey\\Downloads\\quiz.pem"
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Yogita2708/Miniprojectcicd.git'
            }
        }

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
                bat 'docker stop quiz-container || exit 0'
                bat 'docker rm quiz-container || exit 0'
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
        bat """
        ssh -o StrictHostKeyChecking=no -i "C:\\Users\\Jai Ambey\\Downloads\\quiz.pem" ubuntu@100.53.7.19 "sudo docker pull yogitaagarwal20076/quiz-app:latest && sudo docker stop quiz-app || true && sudo docker rm quiz-app || true && sudo docker run -d -p 80:3000 --name quiz-app yogitaagarwal20076/quiz-app:latest"
        """
    }
}
    }
}