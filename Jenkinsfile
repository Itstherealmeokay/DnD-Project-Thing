pipeline {
    agent any
    
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("dnd-frontend:latest", "-f Dockerfile .")
                }
            }
        }
        
        stage('Run Docker Container') {
            steps {
                script {
                    docker.image("dnd-frontend:latest").run("-p 5173:5173")
                    
                }
            }
        }
        
    }
}