pipeline {
  agent any
  tools {
    nodejs 'node26' // Jenkins > Global Tool Config: NodeJS named "node26"
    allure 'allure'  // Jenkins > Global Tool Config: Allure named "allure"
    jdk 'jdk21'      // Jenkins > Global Tool Config: JDK named "jdk21", pointing to D:\Program Files\Java\jdk-21
  }
  options {
    timeout(time: 20, unit: 'MINUTES')
  }
  environment {
    TEST_CREDS = credentials('e2e-test-user')
  }
  stages {
    stage('Build') {
      steps {
        bat 'npm ci'
        bat 'npx playwright install'
      }
    }
    stage('Test') {
      steps {
        bat '''
          set TEST_USERNAME=%TEST_CREDS_USR%
          set TEST_PASSWORD=%TEST_CREDS_PSW%
          npm run test:make-apt
        '''
      }
      post {
        always {
          allure includeProperties: false,
                 jdk: '',
                 results: [[path: 'allure-results']],
                 reportBuildPolicy: 'ALWAYS'
        }
      }
    }
  }
}