function updateBones(context) {
    const pitchInput = context.getPitchInput()
    const yawInput = context.getYawInput()
    const rollInput = context.getRollInput()

    const builder = createPoseBuilder()
    builder.setRotation("group5", pitchInput * 12, 0, 0)
    builder.setRotation("group4", pitchInput * 12, 0, 0)
    builder.setRotation("group", 0, -yawInput * 12, 0)
    builder.setRotation("ctrl", 8 * pitchInput, 0, 8 * rollInput)
    return builder
}
