document.addEventListener('DOMContentLoaded', function() {
    var didbutton = document.getElementById('new_did_button');
    // onClick's logic below:
    didbutton.addEventListener('click', function() {
        chrome.storage.local.get('did_seed', function(result) {
            //alert(JSON.stringify(result))
            if(result['did_seed'] == undefined) {
                //alert('No DID exists in storage. Request DID from web service');
                chrome.runtime.sendMessage({msg: "The message sent from popup.js"}, function(response) {
                    // called when background responds
                    newDID = JSON.parse(response.msg);
                    Object.keys(newDID).forEach(property => {
                        var didProperty = {};
                        didProperty[property] = newDID[property]; 
                        chrome.storage.local.set(didProperty , function() {
                            //alert(`${property} saved to Chrome local storage`);
                        });
                    });

                    // TODO: make this aware of the async nature of setting properties
                    alert("New DID saved in storage");
                });
            }
            else {
                alert('DID found in storage');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var deletebutton = document.getElementById('delete_did_button');
    // onClick's logic below:
    deletebutton.addEventListener('click', function() {
        //chrome.storage.sync.clear();
        chrome.storage.local.remove(["did_seed", "did_canonical", "did_longform"]);
        alert("DID deleted from storage");
    });
});