# FaustynaFront

## development

### starting mocks 
```
docker run -it --rm   -p 8080:8080   -v $PWD/wiremock_mocks:/home/wiremock   rodolpheche/wiremock --enable-stub-cors
```
or simply ```./start_moc.sh```

### starting local environment
```
ng serve --configuration=localhost
```

## building docekr image

```
./build_docker.sh
```