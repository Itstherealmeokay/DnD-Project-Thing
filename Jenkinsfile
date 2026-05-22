pipeline {
    agent any

    environment {
        IMAGE_NAME = 'dnd-frontend'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        IMAGE_REPO = "${env.IMAGE_NAME}:${env.IMAGE_TAG}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('dnd-frontend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Lint') {
            steps {
                dir('dnd-frontend') {
                    sh 'npm run lint'
                }
            }
        }

        stage('Build App') {
            steps {
                dir('dnd-frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    appImage = docker.build(env.IMAGE_REPO, 'dnd-frontend')
                }
            }
        }

        stage('Smoke Test Container') {
            steps {
                script {
                    sh "docker run -d --name ${env.IMAGE_NAME}-${env.BUILD_NUMBER} -p 5173:5173 ${env.IMAGE_REPO}"
                    sh 'curl --retry 15 --retry-delay 1 --retry-all-errors http://localhost:5173'
                }
            }
            post {
                always {
                    sh "docker rm -f ${env.IMAGE_NAME}-${env.BUILD_NUMBER} || true"
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    echo 'Configure docker.withRegistry(...) here and push to your registry'
                    // Example:
                    // docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                    //     appImage.push()
                    //     appImage.push('latest')
                    // }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy this image to your target environment after pushing it to a registry'
            }
        }
    }
}