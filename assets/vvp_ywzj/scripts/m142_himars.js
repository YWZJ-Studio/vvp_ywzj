const himars = ["Roket1", "Roket2", "Roket3", "Roket4", "Roket5", "Roket6"]

function updateBones(context) {
    const builder = createPoseBuilder()
    let remainHellfire = context.getWeaponRemainAmmo("turret", 0)
    for (let i = 0; i < himars.length; i++) {
        if (i < himars.length - remainHellfire) {
            builder.hideBone(himars[i])
        }
    }
    return builder
}