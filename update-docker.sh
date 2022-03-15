docker stop english-grammar
docker rm english-grammar
docker build -t english-grammar:v1 .
docker run --name english-grammar -d -p 3032:3000 english-grammar:v1
echo Docker start http://localhost:3032