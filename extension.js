// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios')
// const xmlParser = require('fast-xml-parser');
const { XMLParser} = require("fast-xml-parser");

const parser = new XMLParser()

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	const result = await axios.get("https://blog.webdevsimplified.com/rss.xml")
	const parsedData = parser.parse(result.data)
	const articles = parsedData.rss.channel.item.map(article => {
		return {
			label: article.title,
			detail: article.description,
			link: article.link
		}
	})
	console.log(articles)

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "nangosha-first-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('nangosha-first-extension.helloNangosha', async function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// may remove this function
		vscode.window.showInformationMessage('Hi, Nangosha from nangosha-first-extension!');

		const article = await vscode.window.showQuickPick(articles, {
			matchOnDetail: true
		})
		if (article === null){
			console.log("article is null");
			return;
		}
		vscode.env.openExternal(article.link);
	}); 

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
