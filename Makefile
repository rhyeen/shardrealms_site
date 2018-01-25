### Edit these variables ###
IMG_NAME=shardrealms-web
PORT=8080
SSL_PORT=4443
TAG=local
SET_NODE_ENV=development
### End of edit ###
MOUNT_FROM=$(shell pwd)
MOUNT_TO=/home/default

IMG=sr_creation/$(IMG_NAME)
CONTAINER=$(IMG_NAME)
RUNOPTS=-p $(PORT):80 -p $(SSL_PORT):443

build:
	(rm -rf node_modules || true) && \
	docker build --pull -t \
	$(IMG):$(TAG) \
	--build-arg SET_NODE_ENV=$(SET_NODE_ENV) ./.

run-enter: rm
	docker run -it $(RUNOPTS) \
	--name $(CONTAINER) \
	-v $(MOUNT_FROM):$(MOUNT_TO) \
	-e ENVIRONMENT=dev \
	$(IMG):$(TAG) /bin/bash

run-local: rm
	docker run -d $(RUNOPTS) \
	--name $(CONTAINER) \
	-v $(MOUNT_FROM):$(MOUNT_TO) \
	-e ENVIRONMENT=dev \
	$(IMG):$(TAG) npm run dev

run-prod: rm
	docker run -d -p $(PORT):80 \
	-p 443:443 \
	--name $(CONTAINER) \
	-e ENVIRONMENT=prod \
	--env-file $(MOUNT_FROM)/src/private/envvars/env.list
	--restart on-failure:5 \
	$(IMG):$(TAG) npm start

push:
	docker push $(IMG):$(TAG)

test: rm
	docker run $(RUNOPTS) \
	--name $(CONTAINER) \
	--rm \
	-e ENVIRONMENT=dev \
	$(IMG):$(TAG) npm test

rm:
	docker rm -f $(CONTAINER) || true

enter:
	docker exec -it $(CONTAINER) /bin/bash
