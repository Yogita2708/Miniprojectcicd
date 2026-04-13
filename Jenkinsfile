pipeline {
    agent any

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
                bat 'docker build -t quiz-app .'
            }
        }

        stage('Run Container') {
            steps {
                bat 'docker run -d -p 5000:3000 quiz-app'
            }
        }
    }
}