
export const fetchContactSevice = async () => {
    try {
        let res = await require('config/data')
        return res?.data?.response
    } catch(e) {
        console.log(e)
    }
}