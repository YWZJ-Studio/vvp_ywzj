const missiles = ["group11", "group6", "group9", "group5", "group12", "group8", "group10", "group7"]

function updateBones(context) {
    const tickCount = context.tickCount()
    if (tickCount % 20 < 5) {
        context.setBoneIlluminated("base3", true)
    } else {
        context.setBoneIlluminated("base3", false)
    }

    const previousPropellerRotation = context.getFloat("propellerRotation", 0)
    const propellerRotation = (previousPropellerRotation + context.getPower() / 5) % 360
    context.setFloat("propellerRotation", propellerRotation)

    const builder = createPoseBuilder()
    builder.setRotation("propeller", 0, -propellerRotation, 0)
    builder.setRotation("tailPropeller", -propellerRotation * 5, 0, 0)

    builder.setRotation("group14", context.getPitchInput() * 10, 0, -context.getRollInput() * 10)
    builder.setRotation("group15", context.getPitchInput() * 10, 0, -context.getRollInput() * 10)

    builder.setRotation("bone7", 0, -context.getPartYRot("sighting_system"), 0)
    builder.setRotation("group3", -context.getPartXRot("sighting_system"), 0, 0)
    builder.setRotation("turret", 0, -context.getPartYRot("turret"), 0)
    builder.setRotation("barrel", -context.getPartXRot("turret"), 0, 0)

    let remainMissiles = context.getWeaponRemainAmmo("sighting_system", 1)
    for (let i = 0; i < missiles.length; i++) {
        if (i < missiles.length - remainMissiles) {
            builder.hideBone(missiles[i])
        }
    }
    return builder
}
