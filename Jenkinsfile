#!groovy

import groovy.json.JsonSlurper
import java.net.URL

pipeline {
	agent{ label 'Java'
	}
    options {
        parallelsAlwaysFailFast()
    }
    environment { 
        CI = 'false'
    }
	stages {
		stage ('Preparação do Ambiente') {
			steps {
			        echo "$BRANCH_STREAM"
					echo "Ajustando valores de propriedades"
					script {
						
						//configura diretório com valores da Build Definition RTC
						setProperty("JOB_DIRETORIO",getProperty("team.scm.fetchDestination"))
						
						//configura caminho da aplicacao
						setProperty("JOB_CAMINHO_APLICACAO",getProperty("JOB_DIRETORIO") + "/" + getProperty("JOB_COMPONENTE"))
						
						//adiciona pasta da aplicação .NET ou projeto java caso exista
						if (getProperty("JOB_PASTA_APLICACAO") != ""){
							setProperty("JOB_CAMINHO_APLICACAO",getProperty("JOB_CAMINHO_APLICACAO") + "/" + getProperty("JOB_PASTA_APLICACAO"))
						}
 
						//Configura o AMBIENTE
						env.AMBIENTE = "desenvolvimento"
						
						if (getProperty("BRANCH_STREAM").contains("RELEASE")){
							env.AMBIENTE = "release"
						}

					} //script
					
					// baixa artefatos do RTC
					checkout([$class: 'RTCScm', avoidUsingToolkit: false, buildType: [buildStream: "$BRANCH_STREAM", buildSnapshotContext: [snapshotOwnerType: 'none', processAreaOfOwningStream: "$PROJECT_AREA", owningStream: "$BRANCH_STREAM"], currentSnapshotOwnerType: 'none', value: 'buildStream', processArea: "$PROJECT_AREA", buildStream: "$BRANCH_STREAM", loadDirectory: "$JOB_DIRETORIO", clearLoadDirectory:true, loadPolicy: 'useComponentLoadConfig', createFoldersForComponents: true, componentLoadConfig: 'excludeSomeComponents', componentsToExclude:''], timeout: 480])
		   }
		}//Preparação do Ambiente
		
		//Etapas de Desenvolvimento
		stage('Construção') {
			agent {
				docker {
					// imagem docker node
					image 'repo.dreads.bnb:8082/bnb/node-npm-build'
					//Mapeamento de diretorios para que o Docker tenha acesso no servidor						                    
					args "-v /tmp:/tmp:rw,z -w $env.$JENKINS_HOME -v $JENKINS_HOME/workspace:$env.JENKINS_HOME/workspace:rw,z -v $JENKINS_HOME/tools:$env.JENKINS_HOME/tools:rw,z"
				}
			}
			steps {
					dir("../$env.JOB_BASE_NAME/$JOB_CAMINHO_APLICACAO") {
						withNPM(npmrcConfig:'npm-teste') {
							echo "Construcao NPM Plugin"
							sh "npm install"
							sh "npm run build:development"
						}
						script {

							def versao = sh(script: "npm run env | grep npm_package_version | cut -d '=' -f2", returnStdout: true).trim()
							setProperty("VERSAO",versao)
						}
					} //dir			
			}
		}//Construção
		stage('Testes Unitários') {
			agent {
				docker {
					// imagem docker node
					image 'repo.dreads.bnb:8082/bnb/node-npm-build'
					//Mapeamento de diretorios para que o Docker tenha acesso no servidor						                    
					args "-v /tmp:/tmp:rw,z -w $env.$JENKINS_HOME -v $JENKINS_HOME/workspace:$env.JENKINS_HOME/workspace:rw,z -v $JENKINS_HOME/tools:$env.JENKINS_HOME/tools:rw,z"
				}
			}
			steps {
					dir("../$env.JOB_BASE_NAME/$JOB_CAMINHO_APLICACAO") {
						withNPM(npmrcConfig:'npm-teste') {
							sh "npm test"
						}
					} //dir
			}
		}	
		//Verificação Sonar
		stage ('Verificação Sonar') {
			//agent {
			//	docker {
					// imagem docker node
			//		image 'repo.dreads.bnb:8083/bnb/node_10-openjdk_8:v1'
					//Mapeamento de diretorios para que o Docker tenha acesso no servidor						                    
			//		args "-v /tmp:/tmp:rw,z -w $env.$JENKINS_HOME -v $JENKINS_HOME/workspace:$env.JENKINS_HOME/workspace:rw,z -v $JENKINS_HOME/tools:$env.JENKINS_HOME/tools:rw,z"
			//	}
		   //}
		   steps {		   
			   echo "Fazendo Sonar do $env.JOB_BASE_NAME e componente $JOB_COMPONENTE"
			   
			   //script {

					  //validarSonar(getProperty("BRANCH_STREAM"))
					  echo "skip 1"
			   //}
			   
			   echo "Salvando dados Sonar do $env.JOB_BASE_NAME e componente $JOB_COMPONENTE"
			   //salvarDadosSonar('desenvolvimento')
			   echo "skip 2"
		   }
		}//Verificação Sonar
		//publicacao
		stage('Gerar Imagem Nexus') {
			steps {
				//build docker e push para o nexus
				construirImagem('s549/s549-empresa',getProperty("VERSAO"),getProperty("BUILD_NUMBER"))
			}
		} //publicacao		

		stage('Deploy Servidor Desenvolvimento') {
            when { environment name: 'AMBIENTE', value: 'desenvolvimento' }		
		    steps {
				//publicando no openshift
			    deployServidor(getProperty("VERSAO"),getProperty("BUILD_NUMBER"),'s549-empresa','desenvolvimento')			
			}
		}//publicao servidor		
	}
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////
////  Definições de funções - Não devem ser alteradas
////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


def appendToFile(String folder, String fileName, String line) {
	
	dir("../$env.JOB_BASE_NAME/$JOB_CAMINHO_APLICACAO$folder") {
	
		echo "$fileName"
	
		def current = ""
		if (fileExists(fileName)) {
			current = readFile fileName
			echo "$current"
		} else {
			echo "Arquivo sonar não encontrado"
		}
		writeFile file: fileName, text: current + line
	}
		
}
	
// Gerar uma imagem e publicar no  Nexus
def construirImagem(tag,versao,build) {
	node {

		dir("../$env.JOB_BASE_NAME/$JOB_DIRETORIO/$JOB_COMPONENTE") {
			def image

			echo "Registrando o docker no ambiente $ambiente"


				docker.withRegistry('https://ocp-registry.dreads.bnb', '26991b27-10da-47b2-bdc4-e7b6ae67dd7c') {

					echo "Construindo imagem"

					// E preciso transformar isto em parametros para que seja alterado em cada projeto
					
					
					if (getProperty("BRANCH_STREAM").contains("RELEASE")){							
						perimetro = 'release/'
					} else {
						perimetro = 'dev/'
					}
					
					image = docker.build(perimetro+tag+":"+versao+"-"+build,  "--cpuset-cpus 0,1 --force-rm  -f ./Dockerfile.nginx ./")

					echo "Publicado no Nexus"
					image.push()

				}
		}
	}
}


def validarSonar(ambiente) {

	// Entrar no diretorio que contem os fontes
	dir("../$env.JOB_BASE_NAME/$JOB_CAMINHO_APLICACAO") {

			echo "Entrando para a analise SonarQube"
			def scannerHome
			def tipoSonar
			
			try {
			// Obtencao da ferramenta Sonar Scanner com o nome 'SonarScanner'
				scannerHome = tool 'SonarScanner'

			} catch (Exception e) {
				echo "Aconteceu erro na obtencao da ferramenta: $e"
			}

			script{
				
				if (ambiente.contains("RELEASE")) {
					tipoSonar = 'SonarQube VS'
				} else {
					tipoSonar = 'SonarQube Base'
				}
				
				withSonarQubeEnv(tipoSonar) {
					//sh "mvn -Duser.home=$JENKINS_HOME/workspace -Dsonar.projectKey='JAVA:$JOB_PASTA_APLICACAO:$JOB_COMPONENTE'  -Dsonar.branch='$BRANCH_STREAM' org.sonarsource.scanner.maven:sonar-maven-plugin:3.6.0.1398:sonar"
					sh "$scannerHome/bin/sonar-scanner"
				}
				
			}
		
			echo "Esperando QualityGate"
			timeout(time: 5, unit: 'MINUTES') {
				def qualitygate = waitForQualityGate()
                env.QUALITYGATE_STATUS = qualitygate.status
			}
	} //dir

}

// Funcao para salvar os dados da execucao do Sonar
def salvarDadosSonar(ambiente) {

	script {

		echo "Gravando informações adicionais da snapshot"
		appendToFile ("/target/sonar", "report-task.txt", "snapshotid=" + getProperty("team_scm_snapshotUUID") + "\nbuildnumber=" + env.BUILD_NUMBER)
			
			dir("../$env.JOB_BASE_NAME/$JOB_CAMINHO_APLICACAO") {
				
					echo "Salvando dados Sonar"
					try {
						sh "java -jar $env.SONAR_PIPELINE/s095-jenkins-sonar-tool.jar -c ./target/sonar/report-task.txt -p $PROJECT_AREA -s http://s2docd02.dreads.bnb:8888"
			
					} catch (Exception e) {
						error "Houve erro para obter os arquivos do Sonar: $e"
					}
					echo "Terminando de salvar dados Sonar"
			}
			if ((env['QUALITYGATE_STATUS'] == "ERROR") && (env['AMBIENTE'] == "release")) {
                currentBuild.result = "FAILURE"
                error('Resultado do QualityGate:' + env['QUALITYGATE_STATUS'])
            }						
	 }
}

//Publicar aplicacao no OpenShift do DREADS
def deployServidor(versao,build,repositorio,branch) {
   
    script {
        // plugin de execução remota
        def handle = triggerRemoteJob(
        remoteJenkinsName: 'jenkins-pipelines.tst.ocp.dreads.bnb',
        job: 'Dreads-Pipeline',
        parameters: 'tag_version='+versao+'-'+build+'\ngit_branch='+branch+'\ngit_repo_name='+repositorio+'-config'+'\ngit_repo_url=https://gitlab.dreads.bnb/openshift/'+repositorio+'-config.git'
        )
       
        // Get information from the handle
        def status = handle.getBuildStatus()
        def buildUrl = handle.getBuildUrl()
        echo buildUrl.toString() + " finished with " + status.toString()
       
        // Download and parse the archived "build-results.json" (if generated and archived by remote build)
        //def results = handle.readJsonFileFromBuildArchive('build-results.json')
        //echo results.urlToTestResults //only example
		
		//montando link para referência de url
		if (getProperty("BRANCH_STREAM").contains("RELEASE")){		
	        echo "https://"+repositorio+"-release.tst.ocp.dreads.bnb/"	
        } else {
		    echo "https://"+repositorio+".dev.ocp.dreads.bnb/"					
		}
    }
}
 
//Publicar aplicacao no OpenShift do CAPG
def deployServidorCAPGV(versao,build,repositorio,branch) {
   
    script {
        // plugin de execução remota
        def handle = triggerRemoteJob(
        remoteJenkinsName: 'jenkins.hml.ocp.capgv.intra.bnb',
        job: 'Capgv-Pipeline',
        parameters: 'tag_version='+versao+'-'+build+'\ngit_branch='+branch+'\ngit_repo_name='+repositorio+'-config'+'\ngit_repo_url=https://s1gitp01.capgv.intra.bnb/openshift/'+repositorio+'-config.git'
        )
       
        // Get information from the handle
        def status = handle.getBuildStatus()
        def buildUrl = handle.getBuildUrl()
        echo buildUrl.toString() + " finished with " + status.toString()
       
        // Download and parse the archived "build-results.json" (if generated and archived by remote build)
        //def results = handle.readJsonFileFromBuildArchive('build-results.json')
        //echo results.urlToTestResults //only example
		
		//montando link para referência de url
	    echo "https://"+repositorio+".hml.ocp.capgv.intra.bnb/"
    }
}