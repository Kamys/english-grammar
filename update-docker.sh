docker stop english-grammar-2
docker rm english-grammar-2
docker build -t english-grammar:v2 .
docker run --name english-grammar-2 -d -p 3033:3000 english-grammar:v2
echo Docker start http://localhost:3033