import {
    AtalaOperationId,
    AtalaOperationStatus,
    CredentialClaim,
    DidPublicKey,
    IssuingKeyUsage,
    KeyDerivation,
    KeyGenerator,
    MasterKeyUsage,
    MnemonicCode,
    NodeApi,
    NodePayloadGenerator,
    PrismDid,
    RevocationKeyUsage,
} from '@input-output-hk/atala-prism-sdk';

// Waits until an operation is confirmed by the Cardano network.
// NOTE: Confirmation doesn't necessarily mean that operation was applied.
// For example, it could be rejected because of an incorrect signature or other reasons.
async function waitUntilConfirmed(
    nodeApiInstant: NodeApi,
    operationId: AtalaOperationId
  ) {
    function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    for (; ;) {
      const operationInfo = await nodeApiInstant.getOperationInfo(operationId);
      const operationStatus = operationInfo.status;
      console.info(`waitUntilConfirmed: `, AtalaOperationStatus.asString(operationStatus));
      if (
        operationStatus === AtalaOperationStatus.CONFIRMED_AND_APPLIED ||
        operationStatus === AtalaOperationStatus.CONFIRMED_AND_REJECTED
      ) { break; }
      await sleep(1000); // 1 second
    }
}
  
// Creates a list of potentially useful keys out of a mnemonic code
function prepareKeysFromMnemonic(mnemonic: MnemonicCode, pass: string) {
    const seed = KeyDerivation.binarySeed(mnemonic, pass);
    const issuerMasterKeyPair = KeyGenerator.deriveKeyFromFullPath({ seed: seed, didIndex: 0, keyType: MasterKeyUsage, keyIndex: 0 });
    const issuerIssuingKeyPair = KeyGenerator.deriveKeyFromFullPath({ seed: seed, didIndex: 0, keyType: IssuingKeyUsage, keyIndex: 0 });
    const issuerRevocationKeyPair = KeyGenerator.deriveKeyFromFullPath({ seed: seed, didIndex: 0, keyType: RevocationKeyUsage, keyIndex: 0 });
    return {
      MASTER_KEY: issuerMasterKeyPair,
      ISSUING_KEY: issuerIssuingKeyPair,
      REVOCATION_KEY: issuerRevocationKeyPair,
    };
}

const nodeApi = new NodeApi({
    protocol: 'http',
    host: 'ppp.atalaprism.io',
    port: 4433,
});

function generateDID() {
    // Holder generates its identity
    const holderKeys = prepareKeysFromMnemonic(KeyDerivation.randomMnemonicCode(),'secret');
    const holderUnpublishedDid = PrismDid.buildLongFormFromMasterPublicKey(holderKeys.MASTER_KEY.publicKey);
    console.info(`Holder: DID generated: ${holderUnpublishedDid}`); 
    return `${holderUnpublishedDid}`;
}

