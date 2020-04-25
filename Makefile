start:
	docker-compose build
	docker-compose up

stop:
	docker-compose down

clean:
	docker kill $(docker ps -q)
	docker rm $(docker ps -a -q)
	docker rmi $(docker images -q)
	docker system prune
	docker system prune -af
drop-cashe:
	docker rmi $(docker images -a --filter=dangling=true -q)
	docker rm $(docker ps --filter=status=exited --filter=status=created -q)