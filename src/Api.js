
class Api {
    static ip = "http://192.168.1.127"

    static async updateRGB(RGB) {
        const response =
            await fetch(Api.ip + "/led?R=" + RGB.R + "&G=" + RGB.G + "&B=" + RGB.B)
        console.log(await response.json())
    }
}

export default Api;