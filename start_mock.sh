#!/bin/bash
docker run -it --rm   -p 8080:8080   -v $PWD/wiremock_mocks:/home/wiremock   rodolpheche/wiremock --enable-stub-cors
