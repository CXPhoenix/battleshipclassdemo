controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (armoBox > 0) {
        projectile = sprites.createProjectileFromSprite(img`
            5 5 5 5 5 
            5 5 5 5 5 
            5 5 5 5 5 
            5 5 5 5 5 
            5 5 5 5 5 
            2 2 2 2 2 
            2 . 2 . 2 
            2 . 2 . 2 
            `, battleShip, 0, -50)
        armoBox += -1
        shootSound.play()
        if (armoBox == 0) {
            reloadHint.setText("reload..")
        }
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    reloadHint.setText("reloading..")
    reloadHint.setFlag(SpriteFlag.Invisible, false)
    timer.after(500, function () {
        armoBox = 5
        reloadHint.setFlag(SpriteFlag.Invisible, true)
    })
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy(effects.warmRadial, 200)
    otherSprite.destroy(effects.warmRadial, 200)
    info.changeScoreBy(10)
    explosionSound.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.warmRadial, 200)
    explosionSound.play()
    scene.cameraShake(6, 500)
})
let spaceRock: Sprite = null
let projectile: Sprite = null
let reloadHint: TextSprite = null
let battleShip: Sprite = null
let explosionSound: SoundBuffer = null
let shootSound: SoundBuffer = null
let armoBox = 0
info.setScore(0)
info.setLife(3)
armoBox = 5
shootSound = soundEffects.createSound(soundEffects.waveNumber(WaveType.Sawtooth), 1000, 660, 0)
explosionSound = soundEffects.createSound(soundEffects.waveNumber(WaveType.WhiteNoise), 1000, 440, 440)
effects.starField.startScreenEffect()
game.splash("Battle Ship Game")
battleShip = sprites.create(img`
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c b . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . c 2 . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . e 2 . . . . . . . 
    . . . . . . e e 4 e . . . . . . 
    . . . . . . e 2 4 e . . . . . . 
    . . . . . c c c e e e . . . . . 
    . . . . e e 2 2 2 4 e e . . . . 
    . . c f f f c c e e f f e e . . 
    . c c c c e e 2 2 2 2 4 2 e e . 
    c c c c c c e e 2 2 2 4 2 2 e e 
    c c c c c c e e 2 2 2 2 4 2 e e 
    `, SpriteKind.Player)
battleShip.setPosition(80, 110)
battleShip.setFlag(SpriteFlag.StayInScreen, true)
controller.moveSprite(battleShip)
reloadHint = textsprite.create("reload..")
reloadHint.setFlag(SpriteFlag.Invisible, true)
reloadHint.setFlag(SpriteFlag.StayInScreen, false)
reloadHint.setPosition(80, 110)
controller.moveSprite(reloadHint)
game.showLongText("press A to shoot! (if you are using the keyboard to play this game, you can use space or key \"z\" to shoot)", DialogLayout.Bottom)
game.showLongText("press B to reload! (if you are using the keyboard to play this game, you can use enter or key \"x\" to reload)", DialogLayout.Bottom)
game.onUpdate(function () {
    if (armoBox <= 0) {
        reloadHint.setPosition(battleShip.x, battleShip.y)
        reloadHint.setFlag(SpriteFlag.Invisible, false)
    }
})
forever(function () {
    music.playMelody("E G F G E G F G ", 300)
    music.playMelody("F A F G F A F G ", 300)
})
game.onUpdateInterval(500, function () {
    spaceRock = sprites.create(img`
        . . . . . . . . c c c c . . . . 
        . . . . c c c c c c c c c . . . 
        . . . c f c c a a a a c a c . . 
        . . c c f f f f a a a c a a c . 
        . . c c a f f c a a f f f a a c 
        . . c c a a a a b c f f f a a c 
        . c c c c a c c b a f c a a c c 
        c a f f c c c a b b 6 b b b c c 
        c a f f f f c c c 6 b b b a a c 
        c a a c f f c a 6 6 b b b a a c 
        c c b a a a a b 6 b b a b b a . 
        . c c b b b b b b b a c c b a . 
        . . c c c b c c c b a a b c . . 
        . . . . c b a c c b b b c . . . 
        . . . . c b b a a 6 b c . . . . 
        . . . . . . b 6 6 c c . . . . . 
        `, SpriteKind.Enemy)
    spaceRock.setPosition(randint(10, 110), 0)
    spaceRock.setVelocity(0, 100)
    spaceRock.setFlag(SpriteFlag.AutoDestroy, true)
    if (Math.percentChance(40)) {
        spaceRock = sprites.create(img`
            . . . . . . . . c c c c . . . . 
            . . . . c c c c c c c c c . . . 
            . . . c f c c a a a a c a c . . 
            . . c c f f f f a a a c a a c . 
            . . c c a f f c a a f f f a a c 
            . . c c a a a a b c f f f a a c 
            . c c c c a c c b a f c a a c c 
            c a f f c c c a b b 6 b b b c c 
            c a f f f f c c c 6 b b b a a c 
            c a a c f f c a 6 6 b b b a a c 
            c c b a a a a b 6 b b a b b a . 
            . c c b b b b b b b a c c b a . 
            . . c c c b c c c b a a b c . . 
            . . . . c b a c c b b b c . . . 
            . . . . c b b a a 6 b c . . . . 
            . . . . . . b 6 6 c c . . . . . 
            `, SpriteKind.Enemy)
        spaceRock.setPosition(randint(10, 110), 0)
        spaceRock.setVelocity(0, 100)
        spaceRock.setFlag(SpriteFlag.AutoDestroy, true)
    }
})
game.onUpdateInterval(100, function () {
    info.changeScoreBy(1)
})
