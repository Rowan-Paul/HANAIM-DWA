var wsConnection = new WebSocket('ws://localhost:3000/random')

function sendData() {
    var dataObject = {
       userName: document.getElementById("userNameField").value,
       maxValue: parseInt(document.getElementById("maxValueField").value)
    }
   
    wsConnection.send(JSON.stringify(dataObject))

    console.log("SENT DATA:", JSON.stringify(dataObject) );
}

wsConnection.onopen = function(arg) {
    addMessageItem('Connection opened')
};
 
wsConnection.onclose = function(arg) {
    addMessageItem('Connection closed')
};
 
wsConnection.onmessage = function(arg) {
    const message = JSON.parse(arg.data)

    addMessageItem('User ' + message.userName + ' got randomValue: ' + message.randomValue)
}
 
wsConnection.onerror = function(arg) {
    console.log(arg)
};


/**
 * Function for adding text to the messalist element on the page
 * @param {String} text: the text to add to the messageList
 */
function addMessageItem(text) {
    var el = document.createElement("li");
    el.innerHTML = text;
    document.getElementById("messageList").appendChild(el);
}

/**
 * Function for handling form submissions
 */
document.getElementById("messageForm").addEventListener( "submit", function(eventInfo) {
    eventInfo.preventDefault();
    console.log("SUBMIT FORM");
    sendData();
});