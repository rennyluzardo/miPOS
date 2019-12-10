// import getConfig from 'next/config'

// const { publicRuntimeConfig } = getConfig()
const env = 'development'

const environments = {
    development: {
        // APIv1: 'https://dev.mipos.shop/api/v1',
        // APIv2: 'https://dev.mipos.shop/api/v2'
        APIv1: 'http://localhost:8000/api/v1',
        APIv2: 'http://localhost:8000/api/v2'
    },
    staging: {

    },
    production: {
        API: 'https://mipos.shop/api/v1'
    }
}[env]

const common = {
    AUTHORIZATION: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjljZGZhMDg2YTE4YTI5YTgxNmZiODI1MTg2MzEyNDUwNGQxN2YzOWVhZDcwM2VkN2Y4ZGI2NWYwOGViNDRhMWIxOGQ2YzE0MThiMWMxYTg4In0.eyJhdWQiOiIzIiwianRpIjoiOWNkZmEwODZhMThhMjlhODE2ZmI4MjUxODYzMTI0NTA0ZDE3ZjM5ZWFkNzAzZWQ3ZjhkYjY1ZjA4ZWI0NGExYjE4ZDZjMTQxOGIxYzFhODgiLCJpYXQiOjE1NzUzMDMwMzMsIm5iZiI6MTU3NTMwMzAzMywiZXhwIjoxNjA2OTI1NDMzLCJzdWIiOiI0Iiwic2NvcGVzIjpbImVtcGxveWVlIl19.iz0gULz0mB5j0WkATBTqxs1Vi6MiQCvWuJWXI-ZqWuqPi8_5CBnQlJKRRVqiETzwyZfu8QLQ8kWxOURGyN6Gltr-HHnszJiAZDbzM_GC6_z8ojxGtpL5PpPusND8ct9iupLVtxjQGhL5yvC4tP_V8xzZDEv1FaokBMKYvO-A5-PrFF2h5ejmya_wavhxDA5jZy8liNZ8AzMzc-p1-goi_2NrXjEqgyTUsOEJmdHDXB2wHdVQwnj2hkORLyNJD--trOlOq3QjxLieFoiLbAW8fZONdfL_PUXzXT0FIlCRe9Lr8X60ykVnicEdlM4bfDyFkoe0RYsSD124A2Ge6_dJ4HPeZHy36ME5sZ3CJCdspd_BD9aG9Ah_JZdmp-Hv5I4p1EzMfnwyj_enDWdJJYswpZI5yWHBcJJC9DxPsDCAOtE3niQMjEfAp6ZvVaRZAmaKEEu4ziOhk2er4Ni4aIFA7xKCjhj6lYkKjTh1siSAL1RvG747G7Pv3vRo71EkS10px5wFn7PodOXL9RGiYVlGOmO5GC-kMruHY_k30jjMFXh-4VTgpzZNyTPr8Y7R2680_DMkA2wAaF87Hrv0Xkiaf8R5BHnmydbylggXnilcmN8H6J4xwu4bduIxuDA_iK10Q3qo5bLizqm2sP9rwATCohsL1haOq7BHuhPlY2aNB2k'
}

const configs = Object.assign({}, environments, common)

export default configs