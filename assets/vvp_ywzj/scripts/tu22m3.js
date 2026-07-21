function updateBones(context) {
    const pitchInput = context.getPitchInput()
    const yawInput = context.getYawInput()
    const rollInput = context.getRollInput()

    const builder = createPoseBuilder()
    builder.setRotation("group17", -pitchInput * 12, 0, 0)
    builder.setRotation("group18", -pitchInput * 12, 0, 0)
    builder.setRotation("ctrl1", 8 * pitchInput, 0, 8 * rollInput)
    builder.setRotation("ctrl2", 8 * pitchInput, 0, 8 * rollInput)
    builder.setRotation("ctrl1_yaw", 0, 0, -yawInput * 16)
    builder.setRotation("ctrl2_yaw", 0, 0, -yawInput * 16)
    return builder
}
