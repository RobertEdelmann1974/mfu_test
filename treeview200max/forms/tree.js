/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A750ACF0-BD23-4F10-9DA8-6BA2CD35E940"}
 */
function onShow(firstShow, event) {
	refreshTree()
}

/**
 * @AllowToRunInFind
 *
 * @properties={typeid:24,uuid:"E02249A8-C71A-456E-AFB5-D13A0E41ABF2"}
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
 * @properties={typeid:24,uuid:"96C34A3D-6596-458F-BC85-E4ABCF192916"}
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
 * @properties={typeid:24,uuid:"1BE1123E-6C27-4EFF-86BF-1B6909BCDF25"}
 */
function onLoad(event) {
	initTree();
}
