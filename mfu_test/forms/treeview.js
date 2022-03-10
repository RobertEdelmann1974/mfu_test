/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"FF33EEDD-7013-4756-9BAA-95F3C9FF391F",variableType:4}
 */
var recordsTop = 20

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"365DEC04-BCEB-4DDD-8BC8-876EE580F9D9",variableType:4}
 */
var recordsChild = 5


/**
 * @properties={typeid:24,uuid:"78CC5E11-B50D-4E19-81CD-A1F98EA88809"}
 */
function createDemoData() {
	var dsDemoData = databaseManager.createEmptyDataSet(0, ['flag', 'name', 'path', 'parent_path', 'has_checkbox']);

	for (var i = 1; i <= recordsTop; i++) {
		var folderName = 'Parent Folder '+i.toString()
		dsDemoData.addRow([
		0, 
		folderName,
		folderName,
		'',
		0,
		]);
		for (var j = 1; j <= recordsChild; j++) {
			var subFolderName = folderName + ' - Subfolder ' + j.toString();
			dsDemoData.addRow([
			0, 
			subFolderName,
			folderName+subFolderName,
			folderName,
			0,
			]);
		}
	}
	var ds = dsDemoData.createDataSource('demo_data', [JSColumn.INTEGER, JSColumn.TEXT, JSColumn.TEXT, JSColumn.TEXT, JSColumn.INTEGER]);

//	plugins.dialogs.showInfoDialog('Daten erstellt','es wurden ' + dsDemoData.getMaxRowIndex().toString() + ' Datensätze erstellt.');
	
	history.removeForm('tree_impl');
	solutionModel.removeForm('tree_impl');
	var jsForm = solutionModel.cloneForm('tree_impl', solutionModel.getForm('tree'));

	jsForm.dataSource = ds;
	
	var jsRelation = solutionModel.getRelation('folder_children');
	if (!jsRelation) {
		jsRelation = solutionModel.newRelation('folder_children', ds, ds, JSRelation.LEFT_OUTER_JOIN);
		jsRelation.newRelationItem('path', '=', 'parent_path');
	}

	var window = application.createWindow('tree', JSWindow.MODAL_DIALOG);
	// Temp. Titel bis geklärt ist, wieso teilweise ein falsches Konto ausgewählt wird.
	window.title = 'demo tree';
	window.show(jsForm.name);
	
	
	
}