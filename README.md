# speechki

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### включить дебаг кода

в консоли браузера набрать и перезагрузить страницу
```
localStorage.developmentMode = true
```

### задеплоить проект на firebase

настроить deploy.sh на себя 
```
yarn lint && \
yarn build && \
rsync -a --delete ~/web/speechki/dist/* ~/web/speechki/firebase/public && \
cd ~/web/speechki/firebase/ && firebase deploy && \
echo "Успех"
```


### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
