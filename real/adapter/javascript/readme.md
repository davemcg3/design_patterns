# Adapter Pattern

This is an example of an object adapter where the adapter instantiates and calls methods on the adaptees, in this case the AbstractAdapter instantiates and calls methods on the FacebookAdapter, InstagramAdapter, and TwitterAdapter (which are all 3 Adaptees in design pattern parlance).

## Setup
* `npm init`
* `npm i webpack -S`
* `npm i babel-loader babel-preset-es2015 babel-preset-react -S`
* `npm i react react-dom -S`
* `npm i html-webpack-plugin -S`
* `npm i babel-core -S`
* `npm i react-hot-loader -S`
* `npm i react-toolbox -S`
* `npm i style-loader -S`
* `npm i css-loader -S`
* `npm i postcss-loader -S`
* `npm i postcss-import -S`
* `npm i postcss -S`
* `npm i postcss-mixins -S`
* `npm i postcss-cssnext -S`

## Important Commands
To rebuild the bundle when you change React/JavaScript code, from the project root run:
./node_modules/.bin/webpack -d --watch

To run the webserver, from /src/clients run:
ruby -run -e httpd . -p8080
