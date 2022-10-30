import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: '',
    dataset: '',
    apiVersion: '',
    token: '',
    useCdn: false,
})