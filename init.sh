#!/bin/bash

docker-compose exec api sh -c "go run main.go --action=migrate"
docker-compose exec api sh -c "go run main.go --action=seed"