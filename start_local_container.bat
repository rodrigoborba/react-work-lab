echo "Matando o container"
docker kill react-local

echo "Criando o container"
docker run --rm --name react-local -p 3000:80 local/s549/s549-empresa

echo "Logs"
docker logs -f --tail=all react-local


echo "Navegar"
echo docker exec -it react-local sh