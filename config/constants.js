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
    AUTHORIZATION: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlmNDViOTI1ZDgyYTRkMzY3NGI2ZWZjMjRjZWMyODEzMjBkNGY4MTMwY2MyZTYwZjMxMmIxNTE1ZTFmYzg5MjIyOGNmODlkODM0ZDY0MjQ1In0.eyJhdWQiOiIxIiwianRpIjoiOWY0NWI5MjVkODJhNGQzNjc0YjZlZmMyNGNlYzI4MTMyMGQ0ZjgxMzBjYzJlNjBmMzEyYjE1MTVlMWZjODkyMjI4Y2Y4OWQ4MzRkNjQyNDUiLCJpYXQiOjE1NzUzOTEwNzAsIm5iZiI6MTU3NTM5MTA3MCwiZXhwIjoxNjA3MDEzNDcwLCJzdWIiOiIyIiwic2NvcGVzIjpbImVtcGxveWVlIl19.L2FUpGOPhG_ssnX7iWDjo8kpBTIVRD7_COXrw5ied6wppLWQBx_urhA5vIbL6qg4OlPstMRfi9Bx47NZFGyx_L7E1EyNvgX_iljuOYYgJD7qjd_TlEPoTHos19wSjn5zMXsnOq2AwmP3FkblOGkBlkU0UfLgWw8CSnNSkgbLWvE6kuJLhu-IQUFy6wUMGODFGIslX7_7fM1gpPCA6aDZpegbeDUVefMxrAbAmktVsKWD60EKb9K_MOhQVqnf9D3AfYNZOi7B-xuL1uPwtBtKDW-ySxCeWfrv2LyJRV3xC3E-mF1CN9eKOsWvECMM3-bUXv3aEnTFlH4YqPqetx5kpmV6HuW4Tp908KbMBAFf-cxxMsX2Lj-FuBxowssKjWiZVdTgOwkbnAogntVcx-4zDm6edPkjyPz2jC5fhD1CNt73ZfTbKoz7bv0iARRnuI8KdZVCtS90nJNFt4Wmtpt9Id21IH78aY3k8nb258gGxkIZfomp9MVoqG4WJXc8L-wd2F2TuU0f7lycKKBGezOthiLeMZME5h7Sg9vQMl3A1l_OYb3NdyPrRLEJIFCvoHzEDOxEwWUWrcwxVZH0ldihWRJg3Aa5lYayQZqfuk5-sjViR93Am44Bd7dUnkYoB3xGuTNmMNWf0opdpmAps--zpkMa6RFtAPdyDGEA2oXIKzE'
}

const configs = Object.assign({}, environments, common)

export default configs