function updateBones(context) {
    const pitchInput = context.getPitchInput()
    const yawInput = context.getYawInput()
    const rollInput = context.getRollInput()

    const builder = createPoseBuilder()
    // builder.setRotation("wingLB", pitchInput * 20, 0, 0)
    // builder.setRotation("wingRB", pitchInput * 20, 0, 0)
    // builder.setRotation("group", rollInput * 20, 0, 0)
    // builder.setRotation("group12", -rollInput * 20, 0, 0)
    builder.setRotation("krt", 0, -yawInput * 20, 0)
    builder.setRotation("ctrl", 8 * pitchInput, 0, 8 * rollInput)
    return builder
}
