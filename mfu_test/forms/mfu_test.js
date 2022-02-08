
/**
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"8EA1F9EF-138D-4EB0-8F23-D61230313F28"}
 */
function onAction_ButtonClick(event) {
	elements.multifileupload.reset();
	elements.multifileupload.openModal();
}

/**
 * @param {JSUpload} jsUpload
 *
 * @properties={typeid:24,uuid:"63C2FC6B-AC82-485E-ABBC-794B4085848B"}
 */
function onFileUploaded(jsUpload) {
	scopes.globals.fileList.push(jsUpload.getName());
	scopes.globals.fileListText = scopes.globals.fileList.join('\n');
}
