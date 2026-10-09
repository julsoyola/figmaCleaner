"use strict";
figma.showUI(__html__, { width: 320, height: 260, themeColors: true });
figma.ui.onmessage = (msg) => {
    let statusText = 'Done!';
    try {
        if (msg.type === 'clean-hidden') {
            const hiddenNodes = figma.currentPage.findAll((node) => !node.visible);
            let count = 0;
            hiddenNodes.forEach((node) => {
                if (!node.removed) {
                    node.remove();
                    count++;
                }
            });
            statusText = count > 0 ? `Removed ${count} hidden layer(s)` : 'No hidden layers found';
        }
        if (msg.type === 'clean-empty') {
            const emptyNodes = figma.currentPage.findAll((node) => (node.type === 'FRAME' || node.type === 'GROUP') && node.children.length === 0);
            let count = 0;
            emptyNodes.forEach((node) => {
                if (!node.removed) {
                    node.remove();
                    count++;
                }
            });
            statusText = count > 0 ? `Removed ${count} empty container(s)` : 'No empty containers found';
        }
        if (msg.type === 'unwrap-groups') {
            const singleChildGroups = figma.currentPage.findAll((node) => node.type === 'GROUP' && node.children.length === 1);
            let count = 0;
            singleChildGroups.forEach((group) => {
                if (!group.removed && group.parent) {
                    figma.ungroup(group);
                    count++;
                }
            });
            statusText = count > 0 ? `Unwrapped ${count} single-child group(s)` : 'No redundant groups found';
        }
        figma.notify(statusText);
    }
    catch (err) {
        statusText = 'Completed with warnings';
        figma.notify(statusText);
    }
    finally {
        // Guarantees UI unlocks regardless of edge-case exceptions
        figma.ui.postMessage({ type: 'status', message: statusText });
    }
};
