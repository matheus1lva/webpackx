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

### Options
```
	--nodeExternals 			enables webpack-node-externals
```

If you have a webpack config anywhere on your folder, it is going to grab it, merge with our default config, with no need for you to do anything.

### Running
```bash
webpackx <file you want to transpile and run>
```

For e.g: 
```bash
webpackx ./index.tsx
```

It is going to compile your file and run it's result.

### Example and use cases
Well, if you were to start developing a node script where you are using typescript, or babel with a proposal that is not already implemented, for example `optional chaining`. You would need to use `babel-node` or `ts-node` to be able to run on node those scripts, or bunch of scripts.

Why cant we take advantage of webpack powerful tree shaking, bundling and few other features and merge everything together on a easy way? That is why `webpackx` started.

Given for example, you created your server using typescript. You would do the following to start it on node: 

```bash
webpackx ./app.ts 
```

This will trigger a webpack build, compile it and execute on node!

## Next steps
It is on an alpha stage, for now you need to install @babel/core as well, but we are working to fix it.

[ ] Add possibility to change webpack config/update

