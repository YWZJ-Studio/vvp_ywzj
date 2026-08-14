function updateBones(context) {
    const previousPropellerRotation = context.getFloat("propellerRotation", 0)
    const propellerRotation = (previousPropellerRotation + context.getPower() / 5) % 360
    context.setFloat("propellerRotation", propellerRotation)

	const builder = createPoseBuilder()
	builder.setRotation("vint", 0, -propellerRotation, 0)
	builder.setRotation("vint2", -propellerRotation * 5, 0, 0)
	builder.setRotation("lever3", context.getPitchInput() * 10, 0, -context.getRollInput() * 10)
	builder.setRotation("lever4", context.getPitchInput() * 10, 0, -context.getRollInput() * 10)
	return builder
}
