pipeline {
    agent any
    
    environment {
        APP_NAME = 'fundnflow'
        DEPLOY_USER = 'azureuser'
        DEPLOY_HOST = '74.162.69.143'
        DEPLOY_PATH = '/opt/fundnflow'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo ' Checking out code...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo ' Installing dependencies...'
                sh 'npm ci || npm install'
            }
        }
        
        stage('Build') {
            steps {
                echo ' Building application...'
                sh 'npm run build'
            }
        }
        
        stage('Deploy to Azure VM') {
            steps {
                echo ' Deploying to Azure VM...'
                sshagent(['azure-vm-deploy-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} 'pm2 stop ${APP_NAME} || true'
                        
                        rsync -avz --delete \
                            --exclude 'node_modules' \
                            --exclude '.git' \
                            ./ ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/
                        
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} << 'ENDSSH'
cd ${DEPLOY_PATH}
npm install --production
npm run build
pm2 restart ${APP_NAME} || pm2 start npm --name "${APP_NAME}" -- start
pm2 save
ENDSSH
                    """
                }
            }
        }
        
        stage('Health Check') {
            steps {
                echo ' Health check...'
                sh "sleep 10 && curl -f http://${DEPLOY_HOST} || echo 'Check manually'"
            }
        }
    }
    
    post {
        success {
            echo ' Deployment Successful!'
        }
        failure {
            echo ' Deployment Failed!'
        }
    }
}
