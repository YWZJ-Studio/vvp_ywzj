const hellfires = ["HELFIRE1", "HELFIRE5", "HELFIRE2", "HELFIRE6", "HELFIRE3", "HELFIRE7", "HELFIRE4", "HELFIRE8"]

function updateBones(context) {
    const tickCount = context.tickCount()
    if (tickCount % 20 < 5) {
        context.setBoneIlluminated("Ligths4", true)
    } else {
        context.setBoneIlluminated("Ligths4", false)
    }

    const previousPropellerRotation = context.getFloat("propellerRotation", 0)
    const propellerRotation = (previousPropellerRotation + context.getPower() / 5) % 360
    context.setFloat("propellerRotation", propellerRotation)

    const builder = createPoseBuilder()
    builder.setRotation("propeller", 0, -propellerRotation, 0)
    builder.setRotation("tailPropeller", -propellerRotation * 5, 0, 0)

    builder.setRotation("Rushag", context.getPitchInput() * 10, 0, -context.getRollInput() * 10)
    builder.setRotation("Rushag2", context.getPitchInput() * 10, 0, -context.getRollInput() * 10)

    builder.setRotation("camera", context.getPartXRot("sighting_system"), -context.getPartYRot("sighting_system"), 0)

    let remainHellfire = context.getWeaponRemainAmmo("sighting_system", 0)
    for (let i = 0; i < hellfires.length; i++) {
        if (i < hellfires.length - remainHellfire) {
            builder.hideBone(hellfires[i])
        }
    }
    return builder
}