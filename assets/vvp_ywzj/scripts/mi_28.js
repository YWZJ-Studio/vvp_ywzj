const lmurs = ["raketa_1", "raketa_3", "raketa_2", "raketa_4"]

function updateBones(context) {
    const previousPropellerRotation = context.getFloat("propellerRotation", 0)
    const propellerRotation = (previousPropellerRotation + context.getPower() / 5) % 360
    context.setFloat("propellerRotation", propellerRotation)

    const builder = createPoseBuilder()
    builder.setRotation("propeller", 0, -propellerRotation, 0)
    builder.setRotation("tailPropeller", -propellerRotation * 5, 0, 0)
    builder.setRotation("tailPropeller2", propellerRotation * 5, 0, 0)

    builder.setRotation("bone10", context.getPitchInput() * -10, 0, -context.getRollInput() * -10)
    builder.setRotation("bone11", -context.getCollectivePitch() / 100 * 20, 0, 0);

    builder.setRotation("mg", 0, -context.getPartYRot("auto_cannon"), 0)
    builder.setRotation("mg_up", context.getPartXRot("auto_cannon"), 0, 0)

    builder.setRotation("camera", context.getPartXRot("sighting_system2"), -context.getPartYRot("sighting_system2"), 0)

    let remainLmur = context.getWeaponRemainAmmo("sighting_system2", 1)
    for (let i = 0; i < lmurs.length; i++) {
        if (i < lmurs.length - remainLmur) {
            builder.hideBone(lmurs[i])
        }
    }
    return builder
}