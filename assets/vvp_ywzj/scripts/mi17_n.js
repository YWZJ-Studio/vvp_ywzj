function updateBones(context) {
    const previousPropellerRotation = context.getFloat("propellerRotation", 0)
    const propellerRotation = (previousPropellerRotation + context.getPower() / 5) % 360
    context.setFloat("propellerRotation", propellerRotation)

    const builder = createPoseBuilder()
    builder.setRotation("propeller", 0, -propellerRotation, 0)
    builder.setRotation("tailPropeller", -propellerRotation * 5, 0, 0)

    builder.setRotation("lever", context.getPitchInput() * 10, 0, -context.getRollInput() * 10)
    builder.setRotation("lever2", context.getPitchInput() * 10, 0, -context.getRollInput() * 10)

    builder.setRotation("camera", 0, -context.getPartYRot("sighting_system"), 0)
    builder.setRotation("camer", -context.getPartXRot("sighting_system"), 0, 0)

    const remainBomb = context.getWeaponRemainAmmo("sighting_system", 2)
    if (remainBomb <= 0) {
        builder.hideBone("FAB_500")
    }
    return builder
}
