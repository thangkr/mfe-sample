#!groovy

node {
    def mvnHome
    try {
        sh 'git config --global credential.helper cache'
        notifyBuild('STARTED')
        stage('Preparation') {
            mvnHome = '/usr'
        }
        stage('Checkout') {
            // Checkout code from repository
            checkout scm
        }
        stage('Package'){
            if(env.BRANCH_NAME == "develop"){
                sh 'rm -rf ./dist'
                sh 'rm -rf ./node_modules'
             }
        }
        stage('Yarn Install') {
            if(env.BRANCH_NAME == "develop"){
                // sh 'yarn'
                sh 'yarn'
            }
        }
	    stage('Yarn Build') {
            if (env.BRANCH_NAME == "develop") {
                sh 'yarn build:dev'
            }
        }
        stage('Deploy') {
            if (env.BRANCH_NAME == "develop") {
                sh 'aws s3 rm s3://mfe-sample-dev.s3-website.us-east-2.amazonaws.com --recursive'
                sh 'aws s3 sync ./dist s3://mfe-sample-dev.s3-website.us-east-2.amazonaws.com'
            }
        }
        stage('Git Tag'){
            if (env.BRANCH_NAME == "demo") {
                appVersion = sh(script: "cat package.json | jq -r '.version' ", returnStdout: true).trim()
                buildVersion = "MCC_${appVersion}"
                sh "git tag $buildVersion"
                sh "git push origin $buildVersion "
                sh 'git credential-cache exit'
            }
        }
    } catch (e) {
        // If there was an exception thrown, the build failed
        currentBuild.result = "FAILED"
        throw e
    } finally {
        // Success or failure, always send notifications
        notifyBuild(currentBuild.result)
    }
}
// Let's chat with Google Chat now
def notifyBuild(String buildStatus = 'STARTED') {
  buildStatus =  buildStatus ?: 'SUCCESSFUL'

  // Default values
  def colorName = 'RED'
  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} ${env.BUILD_URL}"
  def details = """<p>STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
    <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>"""
  def gchatMessage="${buildStatus}: ${env.JOB_NAME}\nCheck console output at <${env.BUILD_URL}|${env.JOB_NAME} [${env.BUILD_NUMBER}]>"
  // Override default values based on build status

  if (buildStatus == 'STARTED') {
    color = 'YELLOW'
    colorCode = '#FFFF00'
  } else if (buildStatus == 'SUCCESSFUL') {
    color = 'GREEN'
    colorCode = '#00FF00'
  } else if (buildStatus == 'FAILED') {
    color = 'RED'
    colorCode = '#FF0000'
  } else if (buildStatus == 'SKIPPED') {
    color = 'BLUE'
    colorCode = '#8490fc'
  }

  // Send notifications to Slack
  slackSend (color: colorCode, message: summary)
def payload = """
    {"text":"${gchatMessage}"}
"""
def response = httpRequest acceptType: 'APPLICATION_JSON', contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: payload, url: "https://chat.googleapis.com/v1/spaces/AAAAyqNE28U/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=duHDPh6DY86bbxYpbzHaThmynq2wW5MnB6pwDKSyODI%3D"
}
