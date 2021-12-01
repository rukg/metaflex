import {Connection, programs} from '@metaplex/js';
import axios from 'axios';
import {ArweaveData} from './types';


async function getMetaAttributes(metadataAccount: string): Promise<ArweaveData> {

    const connection = new Connection('devnet');
    const metaData = await programs.metadata.Metadata.load(connection, metadataAccount);

    const {data} = await axios.get<ArweaveData>(metaData.data.data.uri);

    return data;
}


getMetaAttributes('DXq59ovE9hLJWYnaP3r9PXss5aYA5xcp8avQz5FTWatV')
    .then(data => console.log(data))
    .catch(error => console.log(error));
