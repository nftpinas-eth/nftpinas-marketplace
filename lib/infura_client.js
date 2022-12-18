import { create as  ipfsClient } from "ipfs-http-client" 

const projectId = process.env.PROJECTID;
const projectSecret = process.env.PROJECTSECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

console.log(projectId + projectSecret)

export const client = ipfsClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
    authorization: auth,
    },
});