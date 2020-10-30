
class Api {

    static async updateRGB(RGB, ip) {
        console.log(ip)
        const response =
            await fetch(ip + "/led?R=" + RGB.R + "&G=" + RGB.G + "&B=" + RGB.B, {mode: 'no-cors'})
        console.log(await response.text())
    }

    static async updateMode(mode, ip) {
        console.log(ip)
        const response =
            await fetch(ip + "/ledMode?mode=" + mode.toString(), {mode: 'no-cors'})
        console.log(await response.text())
    }
}

export default Api;