start_dev:
	docker-compose build
	docker-compose up

make_prod:
	cd frontend
	npm run build

start_prod:
	docker-compose -f docker-compose-prod-ssl.yml up

build_make_prod:
	cd frontend
	sudo npm run build
	cd ..
	sudo docker-compose -f docker-compose-prod-ssl.yml build

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
