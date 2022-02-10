
/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"46DB8146-4EF1-4C9D-B0BF-B4E47E732087"}
 */
function onAction_button(event) {
	if (!scopes.globals.selectedFile) {
		scopes.globals.selectedFile = 'Excel_mit_Bildern.xlsx' 
	}
	var excelContents = plugins.http.getMediaData("media:///"+scopes.globals.selectedFile)
	if (excelContents) {
		var targetFile = plugins.ngdesktopfile.showSaveDialogSync({defaultPath: scopes.globals.selectedFile, title: 'Save ' + scopes.globals.selectedFile});
		if (!targetFile) {
			return;
		}
		targetFile = targetFile.replace(/\\/g, '/');
		plugins.ngdesktopfile.writeFile(targetFile,excelContents);
		application.sleep(5000)
		targetFile = '"' + targetFile + '"';
		var osName = application.getOSName();
		if (/Windows/.test(osName)) {
			plugins.ngdesktoputils.executeCommand('rundll32', ['url.dll,FileProtocolHandler', targetFile]);
		} else if (/Linux|Freebsd/.test(osName)) {
			plugins.ngdesktoputils.executeCommand('mozilla', [targetFile]);
		} else if (/Mac/.test(osName)) {
			plugins.ngdesktoputils.executeCommand('open', [targetFile]);
		}
	}
}
