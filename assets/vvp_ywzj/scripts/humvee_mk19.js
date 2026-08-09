function updateBones(context) {
    const builder = createPoseBuilder()
    if (context.hasOwner("turret")) {
        builder.setRotation("Thehatch2", 145, 0, 0)
    }
    return builder
}
