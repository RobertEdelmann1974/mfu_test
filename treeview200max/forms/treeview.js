/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"CF48B71F-ED2E-4BD7-9F39-F640647DCC61",variableType:4}
 */
var recordsTop = 205;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"FBC239FA-4122-4F06-9818-9EB1087164F4",variableType:4}
 */
var recordsSub = 5;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"2C4F1077-EF9E-4E65-B13D-4425146B6D91",variableType:4}
 */
var recordsSubSub = 0;


/**
 * @properties={typeid:24,uuid:"47B43C67-C8D1-409F-BAD6-A882CC8674AF"}
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
		if (recordsSub) {
			for (var j = 1; j <= recordsSub; j++) {
				var subFolderName = folderName + ' - Subfolder ' + j.toString();
				dsDemoData.addRow([
				0, 
				subFolderName,
				folderName+subFolderName,
				folderName,
				0,
				]);
				if (recordsSubSub) {
					for (var k = 1; k <= recordsSubSub; k++) {
						var subSubFolderName = folderName + ' - Subfolder ' + j.toString() + ' - Sub-Subfolder ' + k.toString();
						dsDemoData.addRow([
						0, 
						subSubFolderName,
						folderName+subFolderName+subSubFolderName,
						folderName+subFolderName,
						0,
						]);
					}
				}
			}
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
