let item = 0
let must_reset = 0
let reset_photon = 0
pins.A3.setPull(PinPullMode.PullUp)
let brightness = 120
light.setAll(0xffffff)
forever(function () {
    // I love this software hack! When using the Photon
    // module (which is a Turtle which can draw lights on
    // its path), the only way to turn the Turtle off is
    // to reset the Circuit Playground. In order to
    // prevent the user from doing this, I devised a
    // method which uses the state of the microcontroller
    // to set a variable which only invokes a reset when
    // it has been set. When the bulb is disconnected from
    // the base, a cool Photon animation plays, and a
    // variable called "Must Reset" is set to 1. When the
    // bulb connects to the base, we check for the state
    // of "Must Reset" and if it is set to 1, then a
    // different animation plays and a variable "Reset
    // Photon" is set to 1. Now, on the next iteration we
    // have a condition which checks if "Must Reset" and
    // "Reset Photon" are each set to 1; if they are then
    // the Circuit Playground resets. After the base
    // resets, the code for the initial "on start" event
    // is executed, and in this case we just set the LEDs
    // to white at half brightness. Since "Must Reset" is
    // no longer set (since the bulb is still in
    // electrical contact with the base) we have
    // successfully completed the state machine!
    if (pins.A3.digitalRead()) {
        for (let i = 0; i < 9; i++) {
            pause(20)
            light.setPhotonMode(PhotonMode.PenDown)
            light.setPhotonPenHue(item)
            light.photonForward(1)
            item += 5
        }
        must_reset = 1
    } else if (reset_photon == 1 && must_reset == 1) {
        control.reset()
    } else {
        if (must_reset == 1) {
            reset_photon = 1
            light.setPhotonMode(PhotonMode.Eraser)
            light.photonFlip()
            for (let i = 0; i < 9; i++) {
                pause(20)
                light.photonForward(1)
            }
        }
    }
    pause(1000)
})
