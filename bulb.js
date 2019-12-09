input.onGesture(Gesture.Shake, function () {
    // This IF is satisfied only after connecting and
    // disconnecting the bulb from the base, then shaking
    // the bulb. This results in the bulb only going back
    // to white after it's been connected to the base, as
    // it's not a value inside "shake colors"
    if (shake_after_connect == 1) {
        light.setAll(0xffffff)
        shake_after_connect = 0
    } else {
        random_color = Math.randomRange(0, 8)
        light.setAll(shake_colors[random_color])
    }
})
let activated = 0
let random_color = 0
let shake_colors: number[] = []
let shake_after_connect = 0
pins.A3.setPull(PinPullMode.PullUp)
light.setAll(0xffffff)
let brightness = 0
music.setVolume(255)
shake_after_connect = 0
shake_colors = [Colors.Red, Colors.Orange, Colors.Yellow, Colors.Green, Colors.Blue, Colors.Indigo, Colors.Violet, Colors.Purple, Colors.Pink]
forever(function () {
    while (!(pins.A3.digitalRead())) {
        // This IF is satisfied only during the first time it
        // is run, when the bulb connects to the base
        if (activated == 0) {
            activated = 1
            music.baDing.play()
            shake_after_connect = 1
        }
        if (brightness <= 255) {
            brightness += 10
            light.setBrightness(brightness)
        }
        if (brightness >= 255) {
            light.showAnimation(light.rainbowAnimation, 100)
        }
    }
    // Since there is no color changing happening here,
    // whichever color was last displayed in the rainbow
    // animation is the color which is left displaying
    activated = 0
    // Modulates brightness between 36 -> 255 when bulb is
    // disconnected from base
    if (brightness < 255) {
        brightness += 5
        light.setBrightness(brightness)
    } else {
        pause(500)
        while (brightness > 35) {
            pause(25)
            brightness += -5
            light.setBrightness(brightness)
        }
    }
})
