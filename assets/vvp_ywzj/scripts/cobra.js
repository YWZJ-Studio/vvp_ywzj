const missiles = ["missile2", "missile1", "missile4", "missile3", "missile6", "missile5", "missile8", "missile7"]

function updateBones(context) {
    const previousPropellerRotation = context.getFloat("propellerRotation", 0)
    const propellerRotation = (previousPropellerRotation + context.getPower() / 5) % 360
    context.setFloat("propellerRotation", propellerRotation)

    const previousGunBarrelRotation = context.getFloat("gunBarrelRotation", 0)
    const deltaTime = (context.currentTimeMillis() - context.lastRenderTime()) / 1000 * 20
    const deltaRotation = context.getPower() > 0 ? (deltaTime * 32) : 0
    const gunBarrelRotation = (previousGunBarrelRotation + deltaRotation) % 360
    context.setFloat("gunBarrelRotation", gunBarrelRotation)

    const builder = createPoseBuilder()
    builder.setRotation("propeller", 0, -propellerRotation, 0)
    builder.setRotation("tailPropeller", -propellerRotation * 5, 0, 0)
    builder.setRotation("barrel2", 0, 0, gunBarrelRotation)

    builder.setRotation("group4", context.getPitchInput() * 10, 0, -context.getRollInput() * 10)
    builder.setRotation("group6", context.getPitchInput() * 10, 0, -context.getRollInput() * 10)

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
