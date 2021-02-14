#!/bin/bash
docker build --build-arg ENVIRONMENT=production -t gallery.translation-frontend --network local_network .