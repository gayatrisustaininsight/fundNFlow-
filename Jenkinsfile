pipeline {
    agent any

    environment {
        APP_NAME = 'fundnflow'
        DEPLOY_USER = 'azureuser'
        DEPLOY_HOST = '74.162.69.143'
        DEPLOY_PATH = '/opt/fundnflow'
        EMAIL_RECIPIENT = 'pardeep.kumar@sustaininsight.com'
        APP_URL = 'https://dev.fundnflow.com'
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                sh 'npm ci || npm install'
            }
        }

        stage('Build') {
            steps {
                echo '🏗️ Building application...'
                sh 'npm run build'
            }
        }

        stage('Deploy to Azure VM') {
            steps {
                echo '🚀 Deploying to Azure VM...'
                sshagent(['azure-vm-deploy-key']) {
                    sh """
                        echo "Stopping application..."
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} 'pm2 stop ${APP_NAME} || true'

                        echo "Syncing files..."
                        rsync -avz --delete \
                            --exclude 'node_modules' \
                            --exclude '.git' \
                            --exclude '.env.local' \
                            ./ ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/

                        echo "Installing and building on server..."
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} << 'ENDSSH'
set -e
cd ${DEPLOY_PATH}

echo "Installing dependencies..."
npm install

echo "Building application..."
npm run build

echo "Starting/Restarting PM2..."
pm2 restart ${APP_NAME} || pm2 start npm --name "${APP_NAME}" -- start

echo "Saving PM2 config..."
pm2 save

echo "Deployment completed successfully!"
ENDSSH
                    """
                }
            }
        }

        stage('Health Check') {
            steps {
                echo '🏥 Running health check...'
                script {
                    sh """
                        echo "Waiting for application to start..."
                        sleep 15

                        echo "Testing HTTP endpoint..."
                        if curl -f -s --connect-timeout 10 http://${DEPLOY_HOST}:3000 > /dev/null; then
                            echo "✅ Application is responding"
                        else
                            echo "⚠️ Application might not be fully ready yet"
                        fi

                        echo "Checking HTTPS endpoint..."
                        if curl -f -s --connect-timeout 10 ${APP_URL} > /dev/null; then
                            echo "✅ HTTPS endpoint is accessible"
                        else
                            echo "⚠️ HTTPS endpoint check failed (might need manual verification)"
                        fi
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
            emailext (
                to: "${EMAIL_RECIPIENT}",
                subject: "SUCCESS: ${APP_NAME} Deployment - Build #${BUILD_NUMBER}",
                body: """
Build #${BUILD_NUMBER} deployed successfully!

Application: ${APP_NAME}
Server: ${DEPLOY_HOST}
URL: ${APP_URL}
Build Time: ${new Date()}

Build Details: ${BUILD_URL}
Console Output: ${BUILD_URL}console

The application is now live and ready for testing.
                """,
                mimeType: 'text/plain'
            )
        }

        failure {
            echo '❌ Deployment Failed!'
            emailext (
                to: "${EMAIL_RECIPIENT}",
                subject: "FAILED: ${APP_NAME} Deployment - Build #${BUILD_NUMBER}",
                body: """
Build #${BUILD_NUMBER} deployment FAILED!

Application: ${APP_NAME}
Server: ${DEPLOY_HOST}
Failed At: ${new Date()}

Console Output: ${BUILD_URL}console
Build Details: ${BUILD_URL}

Please check the logs and retry the deployment.

Quick Debug:
ssh ${DEPLOY_USER}@${DEPLOY_HOST}
cd ${DEPLOY_PATH}
pm2 logs ${APP_NAME}
pm2 status
                """,
                mimeType: 'text/plain',
                attachLog: true
            )
        }

        always {
            echo '🧹 Cleaning up workspace...'
            cleanWs()
        }
    }
}
