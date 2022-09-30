"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var atala_prism_sdk_1 = require("@input-output-hk/atala-prism-sdk");
// Waits until an operation is confirmed by the Cardano network.
// NOTE: Confirmation doesn't necessarily mean that operation was applied.
// For example, it could be rejected because of an incorrect signature or other reasons.
function waitUntilConfirmed(nodeApiInstant, operationId) {
    return __awaiter(this, void 0, void 0, function () {
        function sleep(ms) {
            return new Promise(function (resolve) { return setTimeout(resolve, ms); });
        }
        var operationInfo, operationStatus;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, nodeApiInstant.getOperationInfo(operationId)];
                case 1:
                    operationInfo = _a.sent();
                    operationStatus = operationInfo.status;
                    console.info("waitUntilConfirmed: ", atala_prism_sdk_1.AtalaOperationStatus.asString(operationStatus));
                    if (operationStatus === atala_prism_sdk_1.AtalaOperationStatus.CONFIRMED_AND_APPLIED ||
                        operationStatus === atala_prism_sdk_1.AtalaOperationStatus.CONFIRMED_AND_REJECTED) {
                        return [3 /*break*/, 4];
                    }
                    return [4 /*yield*/, sleep(1000)];
                case 2:
                    _a.sent(); // 1 second
                    _a.label = 3;
                case 3: return [3 /*break*/, 0];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Creates a list of potentially useful keys out of a mnemonic code
function prepareKeysFromMnemonic(mnemonic, pass) {
    var seed = atala_prism_sdk_1.KeyDerivation.binarySeed(mnemonic, pass);
    var issuerMasterKeyPair = atala_prism_sdk_1.KeyGenerator.deriveKeyFromFullPath({ seed: seed, didIndex: 0, keyType: atala_prism_sdk_1.MasterKeyUsage, keyIndex: 0 });
    var issuerIssuingKeyPair = atala_prism_sdk_1.KeyGenerator.deriveKeyFromFullPath({ seed: seed, didIndex: 0, keyType: atala_prism_sdk_1.IssuingKeyUsage, keyIndex: 0 });
    var issuerRevocationKeyPair = atala_prism_sdk_1.KeyGenerator.deriveKeyFromFullPath({ seed: seed, didIndex: 0, keyType: atala_prism_sdk_1.RevocationKeyUsage, keyIndex: 0 });
    return {
        MASTER_KEY: issuerMasterKeyPair,
        ISSUING_KEY: issuerIssuingKeyPair,
        REVOCATION_KEY: issuerRevocationKeyPair
    };
}
var nodeApi = new atala_prism_sdk_1.NodeApi({
    protocol: 'http',
    host: 'ppp.atalaprism.io',
    port: 4433
});

function generateDID() {
    // Holder generates its identity
    var holderKeys = prepareKeysFromMnemonic(atala_prism_sdk_1.KeyDerivation.randomMnemonicCode(), 'secret');
    var holderUnpublishedDid = atala_prism_sdk_1.PrismDid.buildLongFormFromMasterPublicKey(holderKeys.MASTER_KEY.publicKey);
    console.info("Holder: DID generated: ".concat(holderUnpublishedDid));
    return "".concat(holderUnpublishedDid);
}

//module.exports = {generateDID};