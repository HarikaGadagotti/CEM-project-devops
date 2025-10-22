pipeline {
  agent none  // No default agent, we choose per stage
  triggers { githubPush() }  // Trigger via GitHub webhook

  stages {
    stage('Build on Controller') {
      agent { label 'built-in' } // Runs on Jenkins master
      steps {
        echo "Building static website on CONTROLLER"
      }
    }

    stage('Windows Agent Stage') {
      agent { label 'win' }   // Must match your agent label
      steps {
        bat '''
          echo Running on Windows Agent
          cd
          dir
          java -version
        '''
      }
    }

    stage('Archive Artifacts') {
      agent { label 'built-in' } // Can run on master
      steps {
        archiveArtifacts artifacts: '**/*.html, **/*.css, **/*.js', fingerprint: true
      }
    }
  }

  post {
    always {
      echo "Pipeline finished."
    }
  }
}
