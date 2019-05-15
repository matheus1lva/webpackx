# Webpackx
This project came up with a concept that we have `babel-node` and other similar clis, but why not take advantage of webpack and it's multiple options and compile your source code, and run it? Yeah, that is the idea of webpackx.

This still at an alpha stage, it has few bugs which are being hard to fix for now, but i need feedback from the users to be able to add more features to it.

## Getting started
### Pre requisites
* Have a babel config file
* Have everything you need to run babel
* have installed `@babel/core`
  
### Install
> npm install webpackx @babel/core
> yarn add -D webpackx @babel/core


### Running
```bash
webpackx <file you want to transpile and run>
```

For e.g: 
```bash
webpackx ./index.tsx
```

It is going to compile your file and run it's result.

## Next steps
It is on an alpha stage, for now you need to install @babel/core as well, but we are working to fix it.

[ ] Add possibility to change webpack config/update

