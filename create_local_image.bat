echo Criando imagem
docker build -t local/s549/s549-empresa  --cpuset-cpus 0,1 --force-rm -f Dockerfile.nginx .


