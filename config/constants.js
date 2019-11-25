import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const env = publicRuntimeConfig.env || 'development'

const environments = {
    development: {
        API: 'https://mipos.shop/api/v1'
    },
    staging: {

    },
    production: {

    }
}[env]

const common = {
    AUTHORIZATION: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI2ZjAyZjIxYTA4NzkzMjVmY2Y3NDNhNzc1NDUyZjBjZTgyZDRiZDFmMTFmN2Y3MDI0MzM2OGY4MDJiM2Y1MjIxZDIzOTIyMGVlNmMxNDQyIn0.eyJhdWQiOiIxIiwianRpIjoiYjZmMDJmMjFhMDg3OTMyNWZjZjc0M2E3NzU0NTJmMGNlODJkNGJkMWYxMWY3ZjcwMjQzMzY4ZjgwMmIzZjUyMjFkMjM5MjIwZWU2YzE0NDIiLCJpYXQiOjE1NzQwOTQzMzUsIm5iZiI6MTU3NDA5NDMzNSwiZXhwIjoxNjA1NzE2NzM1LCJzdWIiOiI0Iiwic2NvcGVzIjpbImVtcGxveWVlIl19.UaJvDWmWB3w3Lh0NTIpfwunM5U3RxAeXiu3nIyfj5-UxlSs4Ks7jjbSVPtQ_KejVUsD0SeMejS5cOKqplSBghyGmXjb_zmcVYYFWYcH0hW4R34pYOQNP_aH8QY_rAuRwBKsAWBvI409Gvr2vhVgvgMLCQ_i-hk_TJ-VYGcogElk7xkXDeIPHzTY2pOtKHOosZffTsp3dMHZTp7Z5GPStdRElg38LV1FZsR_B4nj5BCCZl51UwwIh0hS2cGIVpsIIP8_tzPk-ptedhTzxhhC8ksYiPDPSXiG0EG2mAdq9h3MSKiWGJHBqp5Y1BdX8nOQVAGs5_9TgV4HxGXrUXtJm-OjKyB1P9OOVqsschnSRqG9cgmxeSkceKn1dS2hL0ga-cMCU17bduekBIsMoTzRjEVk2TU8VAZORc-g8U1Cs8e1-KEz6H-v1VDJfmuhmNq1kYbRfI5cwM7QryoxMsutMlh8cRrKyrcG5V5rivBGkaw_c-6_UVE3W9hEnjEpIzxu8MguTy1CDSeiny6TnPJprrY4mlJ5q_8e0YS9LoxrwWcgg65z3yIHXeVlsV2Mz3gzSNDeDdlC5zJ89vvUMAHbrG2Hq8XCyUmnXE3VO8GgTmcPAPWYUA0QlbhasYv8XIDLAQN3987d-T6ZxhD1PRcgepkmyoqU07UKzMZhIoVUJKxU'
}

const configs = Object.assign({}, environments, common)

export default configs