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
    AUTHORIZATION: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJkZDg2MWJhY2M4NmQxMGEzMTViZWE5ODI5YTg1MzFmMTkzZWM3MjdiOGIyZWE1ZDgwM2ZmNjQ3NWMzMjYyNTMxNmFhMzAyMjU3YTFjOWViIn0.eyJhdWQiOiIxIiwianRpIjoiYmRkODYxYmFjYzg2ZDEwYTMxNWJlYTk4MjlhODUzMWYxOTNlYzcyN2I4YjJlYTVkODAzZmY2NDc1YzMyNjI1MzE2YWEzMDIyNTdhMWM5ZWIiLCJpYXQiOjE1NzQ5MjE2OTcsIm5iZiI6MTU3NDkyMTY5NywiZXhwIjoxNjA2NTQ0MDk3LCJzdWIiOiI0Iiwic2NvcGVzIjpbImVtcGxveWVlIl19.hYwK_GGhy-RNEoHzIb-fEf0b1-ldZatGOBf1Uub6qxBbN3BhYYdylz96KO33xCY2h2Sepb3pwVqfb9_x0UOewibS_KDLqdRUXwBNVwsAYzCQZFj4aOdW6I_MoWtaL4KhXH42YLx-8sbWvewDpPka8SxnjS09WAUM2NFc7HVB3DoiaYDgzwENx4FtWmP9FsQqXLoe3qNOnrXoD14VcmMhZJonHBnsL651JOiv_N8ausWyiRrmOx39R2JZbGAOX2xB9lX3IAotgN75Dz4E9tJQGESEp_jtFOln9lATi9ibYYXJ5iHNPs1MMCko0_i5n7TvKCWopttm0zbIUuTtWPjNWQKk2aqq-tgcOEGtSmDgBdLMN-49JnbRzzNRnP4ptdp4vvQgHCK5En-JfSau547h83xHTlFxK6fDKMYh-4i2Gyk3ivFlYE0EY5FGutRBYx4WPRKC2LTtTq_yNQPTQm1x063LSQvyYF8pOrZ8n40TaC10m587DF9LyT4R51Ehydef90DOlpsFpY-R1eepT-ExSj00nSueAI-mhrU_jhGQMAYZcQzJ2QnAvl3ZZkYcltlFLToLabhSpPWhVBEu5igSJojYXyE1vxO5sE8pKNuDQ8CBEIepsAfdLbsVOGMntocNLdoeCUU-K1HJHpo8qpbIEt32lYxg1ndKAwE1iU-PktM'
}

const configs = Object.assign({}, environments, common)

export default configs