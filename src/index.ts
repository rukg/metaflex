import {actions, Connection, NodeWallet, programs} from '@metaplex/js';
import {Keypair, PublicKey} from '@solana/web3.js';
import axios from 'axios';
import * as fs from 'fs';
import {ArweaveData} from './types';

const {metadata: {MetadataDataData, Metadata}} = programs

const mintKey = 'H9nVEUP9dzXVmTwrwRiAzuk9z8nfWEWbdtU9LSRgJ9Gy';
const metadataAccount = 'DXq59ovE9hLJWYnaP3r9PXss5aYA5xcp8avQz5FTWatV';
const connection = new Connection('devnet');

async function getMetaData(metadataAccount: string): Promise<ArweaveData> {

    const metaData = await Metadata.load(connection, metadataAccount);
    const {data} = await axios.get<ArweaveData>(metaData.data.data.uri);

    return data;
}

async function updateMetaData(mintKey: string): Promise<string> {

    const walletKeyPair = loadWalletKeyPair('path to keypair.json');
    const wallet = new NodeWallet(walletKeyPair);

    const newMetaData = new MetadataDataData({
        name: 'kek_w4',
        uri: 'https://arweave.net/iHqmtoaFaOLQM8gk8IGTmP6-ZTLoL4JOYa12STckmpE',
        symbol: 'K4',
        sellerFeeBasisPoints: 1500,
        creators: [
            new programs.metadata.Creator({
                address: 'AgDpHArdG3cDGRPwdU1njfXrBnCjugxiF4YufC86Wr2s', share: 100, verified: true
            })
        ]
    });

    return await actions.updateMetadata({
        connection: connection,
        editionMint: new PublicKey(mintKey),
        newMetadataData: newMetaData,
        newUpdateAuthority: undefined,
        primarySaleHappened: undefined,
        wallet: wallet
    });
}


function loadWalletKeyPair(path: string): Keypair {
    return Keypair.fromSecretKey(
        new Uint8Array(JSON.parse(fs.readFileSync(path).toString())),
    );
}


getMetaData(metadataAccount)
    .then(data => console.log(data))
    .catch(error => console.log(error));


// updateMetaData(mintKey)
//     .then( txId => console.log(txId))
//     .catch(err => console.log(err));
