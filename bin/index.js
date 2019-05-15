#!/usr/bin/env node

const path = require('path');
const yargsParser = require('yargs-parser');
const webpack = require('webpack');
const { spawn } = require('child_process');

const argv = yargsParser(process.argv.slice(2));

const runProgram = () => {
	const outputFile = path.resolve('dist/bundle.js');
	const program = spawn(process.execPath, [outputFile], {
		std: "inherit",
		shell: true
	});

	program.stdout.on('data', (data) => {
		console.log(data.toString());
	});

	program.stderr.on('data', (data) => {
		console.log(data.toString());
	});
	
	program.on('exit', (code) => {
		process.exit(code);
	});
}

const runCompilation = (file) => {
	const config = {
		mode: "production",
		output: {
			filename: "bundle.js"
		},
		resolve: {
			alias: {
				"@babel/core": path.resolve(__dirname, "../node_modules/@babel/core")
			}
		},
		resolveLoader: {
			modules: [path.resolve(__dirname, "../node_modules")]
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx|ts|tsx)$/,
					exclude: /node_modules/,
					use: ['babel-loader']
				}
			]
		}
	};
	
	config.entry = file;
	const compiler = webpack(config);

	return new Promise((resolve, reject) => {
		compiler.run((fatal, stats) => {
			console.log(stats);
			if (stats && stats.hasErrors()) {
				reject(fatal);
			}
			resolve();
		});
	})

}

const run = async () => {
	const { _: params } = argv;

	if (!params.length) {
		throw new Error("No file passed to wprun");
	}

	try {
		await runCompilation(params[0]);
		runProgram();
	}catch(err){
		console.log(err);
	}
}

run();