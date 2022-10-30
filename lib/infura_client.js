import { create as  ipfsClient } from "ipfs-http-client" 

const projectId = '';
const projectSecret = '';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

export const client = ipfsClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
    authorization: auth,
    },
});