function updateBones(context) {
    const forwardSpeed = context.getForwardSpeed()
    const deltaTime = (context.currentTimeMillis() - context.lastRenderTime()) / 1000 * 20
    const distance = deltaTime * forwardSpeed
    const wheelDiameter = 20 / 16.0
    const rot = distance / (wheelDiameter * 3.1415) * 360.0

    const previousWheelRotation = context.getFloat("wheelRotation", 0)
    const wheelRotation = (previousWheelRotation + rot) % 360
    context.setFloat("wheelRotation", wheelRotation)

    const turnAngle = context.getTurnAngle();
    const turnRotation = turnAngle * 16;

    const builder = createPoseBuilder()
    builder.setRotation("wheelL0Turn", wheelRotation, -turnRotation, 0)
    builder.setRotation("wheelR0Turn", wheelRotation, -turnRotation, 0)
    builder.setRotation("wheelL1", wheelRotation, 0, 0)
    builder.setRotation("wheelR1", wheelRotation, 0, 0)
    builder.setRotation("fxp", turnRotation * 8, 0, 0)

    builder.setRotation("turret", 0, -context.getPartYRot("mg"), 0)
    builder.setRotation("barrel", context.getPartXRot("mg"), 0, 0)

    if (context.hasOwner("mg")) {
        builder.setRotation("Luke", 90, 0, 0)
    }
    return builder
}
