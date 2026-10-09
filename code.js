"use strict";
figma.showUI(__html__, { width: 320, height: 260, themeColors: true });
// Include invisible instance descendants; mutation failures are reported.
figma.skipInvisibleInstanceChildren = false;
figma.ui.onmessage = (message) => {
    if (!message || typeof message !== 'object' || !('type' in message))
        return;
    const type = message.type;
    if (type !== 'clean-hidden' && type !== 'clean-empty' && type !== 'unwrap-groups')
        return;
    run(type);
};
function run(action) {
    let count = 0;
    let skipped = 0;
    try {
        // findAll is parent-first. Process descendants first so deleting a
        // container cannot invalidate pending descendants or undercount them.
        const nodes = figma.currentPage.findAll().reverse();
        for (const node of nodes) {
            if (node.removed)
                continue;
            const matches = action === 'clean-hidden'
                ? node.visible === false
                : action === 'clean-empty'
                    ? (node.type === 'FRAME' || node.type === 'GROUP') && node.children.length === 0
                    : node.type === 'GROUP' && node.children.length === 1;
            if (!matches)
                continue;
            try {
                if (action === 'unwrap-groups' && node.type === 'GROUP') {
                    // Native ungroup preserves positioning and sibling order.
                    figma.ungroup(node);
                }
                else {
                    node.remove();
                }
                count++;
            }
            catch (_a) {
                // Instance descendants and other restricted nodes may be immutable.
                skipped++;
            }
        }
        const result = action === 'clean-hidden'
            ? `Cleaned ${count} hidden ${count === 1 ? 'layer' : 'layers'}`
            : action === 'clean-empty'
                ? `Deleted ${count} empty ${count === 1 ? 'frame or group' : 'frames and groups'}`
                : `Unwrapped ${count} single-child ${count === 1 ? 'group' : 'groups'}`;
        const status = result + (skipped ? `; ${skipped} could not be changed` : '');
        figma.notify(status);
        figma.ui.postMessage({ type: 'result', message: status, error: skipped > 0 });
    }
    catch (_b) {
        const status = `Cleanup stopped after ${count} changes. Use Undo to revert.`;
        figma.notify(status, { error: true });
        figma.ui.postMessage({ type: 'result', message: status, error: true });
    }
}
