
class Api {
    static ip = "http://192.168.1.127"

    static async updateRGB(RGB) {
        const response =
            await fetch(Api.ip + "/led?R=" + RGB.R + "&G=" + RGB.G + "&B=" + RGB.B, {mode: 'no-cors'})
        console.log(await response.text())
    }

    static async updateMode(mode) {
        const response =
            await fetch(Api.ip + "/ledMode?mode=" + mode.toString(), {mode: 'no-cors'})
        console.log(await response.text())
    }
}

export default Api;