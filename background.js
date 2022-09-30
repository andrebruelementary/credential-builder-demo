console.log("background 333");

//const api = import('./prism-api')
//import { api } from './prism-api.js'; 
//import {generateDID} from './prism-api';
//import generateDID from './prism-api'
/*
import { KeyDerivation, KeyGenerator, MasterKeyUsage, IssuingKeyUsage, RevocationKeyUsage, NodeApi, PrismDid } from "./@input-output-hk/atala-prism-sdk";

// Creates a list of potentially useful keys out of a mnemonic code
function prepareKeysFromMnemonic(mnemonic, pass) {
    var seed = KeyDerivation.binarySeed(mnemonic, pass);
    var issuerMasterKeyPair = KeyGenerator.deriveKeyFromFullPath({ seed: seed, didIndex: 0, keyType: MasterKeyUsage, keyIndex: 0 });
    var issuerIssuingKeyPair = KeyGenerator.deriveKeyFromFullPath({ seed: seed, didIndex: 0, keyType: IssuingKeyUsage, keyIndex: 0 });
    var issuerRevocationKeyPair = KeyGenerator.deriveKeyFromFullPath({ seed: seed, didIndex: 0, keyType: RevocationKeyUsage, keyIndex: 0 });
    return {
        MASTER_KEY: issuerMasterKeyPair,
        ISSUING_KEY: issuerIssuingKeyPair,
        REVOCATION_KEY: issuerRevocationKeyPair
    };
}
var nodeApi = new NodeApi({
    protocol: 'http',
    host: 'ppp.atalaprism.io',
    port: 4433
});

function generateDID() {
    // Holder generates its identity
    var holderKeys = prepareKeysFromMnemonic(KeyDerivation.randomMnemonicCode(), 'secret');
    var holderUnpublishedDid = PrismDid.buildLongFormFromMasterPublicKey(holderKeys.MASTER_KEY.publicKey);
    console.info("Holder: DID generated: ".concat(holderUnpublishedDid));
    return "".concat(holderUnpublishedDid);
}
*/
chrome.runtime.onMessage.addListener( function(request,sender,sendResponse)
{
    if( request.msg.indexOf('popup.js') > -1)
    {
        console.log('background received message');
        chrome.tabs.query({active:true},function(tabs){
            console.log('tabs queried');
            if(tabs.length === 0) {
                console.log('tabs.length == 0');
                sendResponse({msg:'no tab found'});
                return;
            }
            console.log('tabs found');
            //didString = generateDID();
            //sendResponse( {msg:'background generated DID '+ didString} );
            fetch("http://prism-api.stakepoolcentral.com:9080/did/new", {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            })
                .then(response => response.json())
                .then(json => sendResponse( {msg: JSON.stringify(json)}))
                .catch(error => console.log('Error:', error));
                return true;
            //sendResponse({msg: 'background say HI!'})
        });        
    }
    // return true to make sure message port stays open
    // https://stackoverflow.com/questions/54126343/how-to-fix-unchecked-runtime-lasterror-the-message-port-closed-before-a-respon
    return true;
});

/*chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.create({ url: chrome.runtime.getURL("extension-index.html") });
});*/

// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// When the extension is installed or upgraded ...
/*chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, 
        function() {
            // With a new rule ...
            chrome.declarativeContent.onPageChanged.addRules([
            {
                // That fires when a page's URL contains a 'g' ...
                conditions: [ new chrome.declarativeContent.PageStateMatcher({ pageUrl: { urlContains: 'g' },
                })],
                // And shows the extension's page action.
                actions: [ new chrome.declarativeContent.ShowPageAction() ]
            }
            ]);
        });
});

// listen for when someone clicks the page action
chrome.pageAction.onClicked.addListener( function () {
    // query the current tab on the current window
     chrome.tabs.query( { active: true, currentWindow: true }, function ( tabs ) {
      // execute the main.js script on this tab
      chrome.tabs.executeScripts(
        tabs[0].id, 
        { file: 'main.js' }
      );
     });
   });
*/