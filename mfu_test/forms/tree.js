/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C07D7ED6-21D7-454B-8992-B68D0CC0F01F"}
 */
function onShow(firstShow, event) {
	refreshTree()
}


/**
 * @AllowToRunInFind
 *
 * @properties={typeid:24,uuid:"11795052-6E7F-4DBE-9033-FCF0C6919198"}
 */
function refreshTree() {
	elements.tree.removeAllRoots();
	if (foundset.find()) {
		foundset['parent_path'] = '^=';
		foundset.sort('folder_name asc', true);
		foundset.search();
	}
	elements.tree.addRoots(foundset);
	elements.tree.setNodeLevelVisible(1, false);
	elements.tree.setNodeLevelVisible(1, true);
	elements.tree.refresh();
}


/**
 * @properties={typeid:24,uuid:"9EB57C65-4EF6-4DD4-8E92-46DC90528C27"}
 */
function initTree() {
	var ds = 'mem:demo_data';
	elements.tree.setTextDataprovider(ds, 'name');
	elements.tree.setHasCheckBoxDataprovider(ds, 'has_checkbox');
	elements.tree.setCheckBoxValueDataprovider(ds, 'flag');
	elements.tree.setNRelationName(ds, 'folder_children');
	elements.tree.setChildSortDataprovider(ds, 'name');
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"BE7600A8-3A20-4129-B48F-C25C1F30D5B1"}
 */
function onLoad(event) {
	initTree();
}
