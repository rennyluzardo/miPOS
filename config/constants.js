// import getConfig from 'next/config'

// const { publicRuntimeConfig } = getConfig()
const env = 'development'

const environments = {
    development: {
        APIv1: 'https://dev.mipos.shop/api/v1',
        APIv2: 'https://dev.mipos.shop/api/v2'
    },
    staging: {

    },
    production: {
        API: 'https://mipos.shop/api/v1'
    }
}[env]

const common = {
    AUTHORIZATION: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU3ZDA2ZGEzMDI5MWU0Yjc1OTFkMTBhZjdlNmI5YjY5MjJkZTk2M2I5M2IwODQxZDJmNGY5OGVkMDI5ZGYyMzgxMDU3OGViYmJmOGJhYjc1In0.eyJhdWQiOiIxIiwianRpIjoiZTdkMDZkYTMwMjkxZTRiNzU5MWQxMGFmN2U2YjliNjkyMmRlOTYzYjkzYjA4NDFkMmY0Zjk4ZWQwMjlkZjIzODEwNTc4ZWJiYmY4YmFiNzUiLCJpYXQiOjE1NzUxMDI2NzMsIm5iZiI6MTU3NTEwMjY3MywiZXhwIjoxNjA2NzI1MDczLCJzdWIiOiI0Iiwic2NvcGVzIjpbImVtcGxveWVlIl19.iJrBZrvY2T3hwtcw26toGSYAHvTEb-O3DKU9nVIAx14AI2-nmJBo6nJHmhV1pGA_JMHLgdi3jeTgidwFOxFvlwg804ZWVlWYdjT0krb36lLvgUIh3LmHWe-j6BSoWOjUipkUbu9-N3qnnmckXiThpv23xWpJS1GB6IWDNR2Twg9wRhXNytHDTL1Iqc7dEshmzgiYZ9z7pqvhRSx5ryRSFh32C3jF7A2lWwcZyk3ZHiYZ_ALfcZ5ZeY88aLaNyvvqMX0z-G-Tdq9VNDcJJisj3WiQp68pq-I9vUGCmJkVjlSimcAQrI96lJh2p7HkNxy8yHRW-R8Ts3sqhM-ZmVeHbL6oV0TT926DvaC0xrMI9xJUO4zq1RCAnj2T8vWQQ2M4sk97SfiCMw4fNHeTQWNC9259FMoXqs64naH6_0gUciQ_k3f2eXv5eZ28555coiKpHwtgfbDUY1Eeuoie-8Mbw1DxN2jdKJSSkPb2mifZSbl0LK2BIUQQ_1lfxr6tw_AYhNapK0orX8l6j7YGkcJ6pls4cwwh5XdeBbDA74BE0iqYlD1xIi47Oew7d7jlgCIa6Z9czSlOAhR_i9M661aHdYi6OyOFWPYCwtLe-6v5g7NYypwmuAX9iK4UYiPU75fxpGLKWaq8o55fPwE159lCOH9vT35MHmBkgxjQUndCAAk'
}

const configs = Object.assign({}, environments, common)

export default configs