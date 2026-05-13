const hellfires = ["HELFIRE1", "HELFIRE5", "HELFIRE2", "HELFIRE6", "HELFIRE3", "HELFIRE7", "HELFIRE4", "HELFIRE8"]

function updateBones(context) {
    const previousPropellerRotation = context.getFloat("propellerRotation", 0)
    const propellerRotation = (previousPropellerRotation + context.getPower() / 5) % 360
    context.setFloat("propellerRotation", propellerRotation)

    let d1 = 0
    let d2 = 0
    const control = context.getControlUnit()
    if (control.left || control.right) {
        d1 = control.left ? 10 : -10
    }
    if (control.forward || control.backward) {
        d2 = control.forward ? -10 : 10
    } else {
        d2 = Math.max(-10, Math.min(10, -(control.xRot - context.getXRot()) / 30 * 10))
    }

    const builder = createPoseBuilder()
    builder.setRotation("propeller", 0, -propellerRotation, 0)
    builder.setRotation("tailPropeller", -propellerRotation * 5, 0, 0)
    builder.setRotation("Rushag", d2, 0, d1)
    builder.setRotation("Rushag2", d2, 0, d1)
    builder.setRotation("camera", context.getPartXRot("sighting_system"), -context.getPartYRot("sighting_system"), 0)
    let remainHellfire = context.getWeaponRemainAmmo("sighting_system", 0)
    for (let i = 0; i < hellfires.length; i++) {
        if (i < hellfires.length - remainHellfire) {
            builder.hideBone(hellfires[i])
        }
    }
    return builder
}