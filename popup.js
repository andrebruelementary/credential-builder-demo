document.addEventListener('DOMContentLoaded', function() {
    var didbutton = document.getElementById('new_did_button');
    // onClick's logic below:
    didbutton.addEventListener('click', function() {
        //alert('xxx');
        chrome.runtime.sendMessage({msg: "The message sent from popup.js"},
            function(response) {
                // called when background responds
                alert("popup received '"+ response.msg +"' from background");
            }
        );
    });
});

/*document.querySelector('new_did_button').addEventListener('click', function() {
    console.log('Hi!');
});*/