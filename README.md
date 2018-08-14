# GolosAnswers. Open source.

# ETH adress - 0xaed8f20f095c71d5715c0c047e982d19a12425c6

View DEMO - http://golosanswers.ml/

1. Download rep. https://github.com/TeamStarter/GolosAnswers.
2. Build app in the root mvn clean install.
3. Put built-jar to the target folder.
4. Put your front-end single page app to the src/main/docker/code/ 
5. Upload all to the your server.
6. Install docker and docker-compose on your server by this manual:
    https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1
    https://www.youtube.com/watch?v=5LAYTBXIgW8
7. Build docker image in the root:
    sudo docker build -f Dockerfile -t project-2-0.0.1 .
For removing docker image by id use:
    sudo docker rmi Image ab634d08a86b # - For removing docker image by ID 
8. Go to the src/main/docker and up all containers with docker-compose:
   sudo docker compose up
9. Install nginx. Copy front-end single page app to the var/www/html/site1/.
   Change /etc/nginx/site-enable/default.config such as default.config in scr/main/docker
