const MENU_ID = "quickfill-save-selection"

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ID,
    title: "Save to QuickFill",
    contexts: ["selection"]
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === MENU_ID && tab?.id) {
    chrome.tabs.sendMessage(tab.id, { type: "save-selection" })
  }
})
