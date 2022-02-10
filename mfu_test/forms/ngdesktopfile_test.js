
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
	}
}

/**
 * @properties={typeid:24,uuid:"6E3A5AC4-A172-4205-B525-DF8D93E42A95"}
 */
function writeFile_callback() {
	plugins.dialogs.showInfoDialog('Write file','File successfully written.')
}