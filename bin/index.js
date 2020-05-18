#!/usr/bin/env node

const path = require('path');
const yargsParser = require('yargs-parser');
const webpack = require('webpack');
const { spawn } = require('child_process');
const webpacNodeExternals = require('webpack-node-externals');

const argv = yargsParser(process.argv.slice(2));

function onExit(childProcess) {
	return new Promise((resolve, reject) => {
		childProcess.once('exit', (code, signal) => {
			if (code === 0) {
				resolve(undefined);
			} else {
				reject(new Error('Exit with error code: ' + code));
			}
		});
		childProcess.once('error', (err: Error) => {
			reject(err);
		});
	});
}


const runProgram = async () => {
	const outputFile = path.join(outputPath, outputFilename);
	const childProcess = spawn(process.execPath, [outputFile], {
		stdio: [process.stdin, process.stdout, process.stderr],
	});
	await onExit(childProcess);
};

const runCompilation = (file, options) => {
	const config = {
		mode: "production",
		target: "node",
		output: {
			filename: "bundle.js"
		},
		externals: options.nodeExternals ? [webpacNodeExternals()] : [],
		resolve: {
			alias: {
				"@babel/core": path.resolve(__dirname, "../node_modules/@babel/core")
			},
			extensions: ['.ts', '.tsx', '.js', '.json', '.mjs']
		},
		module: {
			rules: [
				{
					test: /\.mjs$/,
					include: /node_modules/,
					type: 'javascript/auto'
				},	
				{
					test: /\.(js|jsx|ts|tsx|mjs)$/,
					use: [require.resolve('babel-loader'), require.resolve('shebang-loader')],
					exclude: [/node_modules/]
				}
			]
		}
	};
	
	config.entry = file;
	const compiler = webpack(config);

	return new Promise((resolve, reject) => {
		compiler.run((fatal, stats) => {
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
		await runCompilation(params[0], {
			nodeExternals: argv.nodeExternals
		});
		runProgram();
	}catch(err){
		throw new Error(err);
	}
}

run();