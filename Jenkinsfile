pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Building static website...'
      }
    }
    stage('Archive') {
      steps {
        archiveArtifacts artifacts: '**/*.html, **/*.css, **/*.js', fingerprint: true
      }
    }
  }
}
