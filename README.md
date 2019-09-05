# Snek The Museum
Apps for ghent project
![mock up](https://github.com/PietVlem/snek-the-museum/blob/master/mockup-snekthemuseum.png?raw=true)

## Set-up
1. create .env file in /backend-cms
```
NMD_BASELINE={'Like Graphics Love Code'}  
NODE_ENV={Development}
NODE_SERVER_HOSTNAME= {127.0.0.1}
NODE_SERVER_PORT= {8080}
MONGODB_CONNECTION= {db connection string}
SKIP_PREFLIGHT_CHECK= {true}
AUTH_JWT_SECRET= {jwt secret}
AUTH_JWT_SESSION= {true}
AUTH_BCRYPT_SALT= {salt string length}
AUTH_FACEBOOK_CLIENT_ID= {facebook id}
AUTH_FACEBOOK_CLIENT_SECRET= {facebook client}
RESET_PASSWORD_URL={"localhost:3000"}
RESET_PASSWORD_SERVICE={"gmail"}
RESET_PASSWORD_GMAIL_ACCOUNT={gmail adress}
RESET_PASSWORD_GMAIL_PASSWORD={password gmail}
```

2. Download npm modules
backend
```
cd ./backend-cms yarn install
cd ./backend-cms/src/client && yarn install
```

app
```
cd ./react-native-app yarn install
```

## Run
1. Server
```
cd ./backend-cms && yarn server:start
```

2. Client
```
cd ./backend-cms/src/client && yarn start
```

3. App start
```
cd ./src/app && expo start
```

