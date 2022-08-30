import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: 'sb1iguge',
    dataset: 'production',
    apiVersion: '2022-08-26',
    token: 'skW7l2jrnBn1idB5K1OUZFjgyKCbUuFs1Fva06xHyLemSI5XwvLhA3Zf4AJybOQraFaM1NKEjMRj7YFJFP0v1c7vfy77jjSC2tnulucRSXx5UDXYu1tcilFIFxy2DOFFsNa4aNgRfq2bpGHyOfR7PGu7Z9LzbILbk6L5SAKAVUjuAHzlfbgk',
    useCdn: false,
})