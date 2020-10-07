/**
 * @module Background
 */



/**
 * @function returnMessage
 * @param {String} MessageToReturn
 * Sends a message to the content script
 */
const returnMessage = MessageToReturn => {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, {
      message: MessageToReturn
    });
  });
};


chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "vtop.vit.ac.in" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

/**
 * Fires after the completion of a request
 */
chrome.webRequest.onCompleted.addListener(
  details => {
    let link = details["url"];
    
    if (link.indexOf("doDigitalAssignment") !== -1 ) {
      returnMessage("DAPage");
    }
    else if (link.indexOf("processViewStudentAttendance") !== -1 ) {
      returnMessage("Attendpage");
    }

  },
  {
    urls: ["*://vtop.vit.ac.in/*"]
  }
);
