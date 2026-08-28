import Phaser from "phaser";
import Player from "./Player";
import Senior from "./Senior";
import MapCollisions from "./MapCollisions";
import CameraManager from "./CameraManager";
import InteractionManager from "./InteractionManager";
import Joystick from "./Joystick";


class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }


    // =========================================================
    // PRELOAD
    // =========================================================

    preload() {

        this.load.image(
            "map",
            "/map/college-map.png"
        );

        this.load.image(
            "characterSheet",
            "/characters/character-sheet.png"
        );
    }


    // =========================================================
    // CREATE
    // =========================================================

    create() {

        // =====================================================
        // MAP
        // =====================================================

        this.map =
            this.add.image(
                0,
                0,
                "map"
            );

        this.map.setOrigin(0, 0);

        this.worldWidth =
            this.map.width;

        this.worldHeight =
            this.map.height;


        // =====================================================
        // PHYSICS WORLD
        // =====================================================

        this.physics.world.setBounds(
            0,
            0,
            this.worldWidth,
            this.worldHeight
        );


        // =====================================================
        // PLAYER
        // =====================================================

        this.playerManager =
            new Player(this);

        this.playerManager.create();


        // =====================================================
        // SENIORS
        // =====================================================

        this.seniorManager =
            new Senior(this);

        this.seniors =
            this.seniorManager.createSeniors();


        // =====================================================
        // INTERACTION MANAGER
        // =====================================================

        this.interactionManager =
            new InteractionManager(this);

        this.interactionManager.create();


        // =====================================================
        // MAP COLLISIONS
        // =====================================================

        this.mapCollisionManager =
            new MapCollisions(this);

        this.mapColliders =
            this.mapCollisionManager.create();


        // =====================================================
        // CAMERA
        // =====================================================

        this.cameraManager =
            new CameraManager(this);

        this.cameraManager.setup();

        //temporary might delete later
        // =====================================================
// UI CAMERA (fixed, unzoomed — for HUD only)
// =====================================================

    this.uiCamera =
        this.cameras.add(
            0,
            0,
            this.scale.width,
            this.scale.height
        );

    this.uiCamera.setZoom(1);

    this.cameras.main.ignore([
        this.interactionManager.talkPrompt,
        this.interactionManager.conversationUI
    ]);

    this.uiCamera.ignore([
        this.map,
        this.player,
        ...this.seniors
    ]);


        // =====================================================
        // KEYBOARD
        // =====================================================

        this.cursors =
            this.input.keyboard.createCursorKeys();

        this.keys =
            this.input.keyboard.addKeys({

                W: Phaser.Input.Keyboard.KeyCodes.W,
                A: Phaser.Input.Keyboard.KeyCodes.A,
                S: Phaser.Input.Keyboard.KeyCodes.S,
                D: Phaser.Input.Keyboard.KeyCodes.D

            });

        // Joystick
            this.joystick = new Joystick(this);
            this.joystick.create();


        // =====================================================
        // RESIZE
        // =====================================================

        this.scale.on(
            "resize",
            () => {

                this.cameraManager.updateCameraZoom();

                //temporary might delete later
                    this.uiCamera.setSize(
                this.scale.width,
                this.scale.height
            );
            //temporary up above

                this.interactionManager
                    .updateTalkPromptPosition();

                this.interactionManager
                    .updateConversationUIPosition();

            }
        );
    }


    // =========================================================
    // UPDATE
    // =========================================================

    update() {

        // =====================================================
        // INTERACTION MANAGER
        // =====================================================

        this.interactionManager.update();


        // =====================================================
        // STOP MOVEMENT DURING CONVERSATION
        // =====================================================

        if (
            this.interactionManager.isInteractionOpen
        ) {

            this.player.setVelocity(
                0,
                0
            );

            return;
        }


        // =====================================================
        // MOVEMENT
        // =====================================================

        const speed = 250;

        let velocityX = 0;
        let velocityY = 0;
        let usingJoystick = false;

        // =====================================================
        // HORIZONTAL MOVEMENT
        // =====================================================

        if (
            this.cursors.left.isDown ||
            this.keys.A.isDown
        ) {

            velocityX = -speed;

        }

        else if (
            this.cursors.right.isDown ||
            this.keys.D.isDown
        ) {

            velocityX = speed;
        }


        // =====================================================
        // VERTICAL MOVEMENT
        // =====================================================

        if (
            this.cursors.up.isDown ||
            this.keys.W.isDown
        ) {

            velocityY = -speed;

        }

        else if (
            this.cursors.down.isDown ||
            this.keys.S.isDown
        ) {

            velocityY = speed;
        }

        // JOYSTICK (mobile) — only kicks in when no keyboard input
        if (
            velocityX === 0 &&
            velocityY === 0 &&
            this.joystick.isActive
        ) {
            velocityX = this.joystick.vector.x * speed;
            velocityY = this.joystick.vector.y * speed;
            usingJoystick = true;
        }


        // =====================================================
        // IDLE
        // =====================================================

        if (
            velocityX === 0 &&
            velocityY === 0
        ) {

            this.player.setVelocity(
                0,
                0
            );


            const currentAnimation =
                this.player.anims.currentAnim?.key;


            if (
                currentAnimation ===
                "fresher-walk-left"
            ) {

                this.player.play(
                    "fresher-idle-left"
                );
            }

            else if (
                currentAnimation ===
                "fresher-walk-right"
            ) {

                this.player.play(
                    "fresher-idle-right"
                );
            }

            else if (
                currentAnimation ===
                "fresher-walk-up"
            ) {

                this.player.play(
                    "fresher-idle-up"
                );
            }

            else if (
                currentAnimation ===
                "fresher-walk-down"
            ) {

                this.player.play(
                    "fresher-idle-down"
                );
            }

            return;
        }


        // =====================================================
        // DIAGONAL MOVEMENT
        // =====================================================

            if (
            velocityX !== 0 &&
            velocityY !== 0 &&
            !usingJoystick
        ) {
            velocityX *= 0.707;
            velocityY *= 0.707;
        }


        // =====================================================
        // WALKING ANIMATION
        // =====================================================

        if (velocityX < 0) {

            if (
                this.player.anims.currentAnim?.key !==
                "fresher-walk-left"
            ) {

                this.player.play(
                    "fresher-walk-left"
                );
            }

        }

        else if (velocityX > 0) {

            if (
                this.player.anims.currentAnim?.key !==
                "fresher-walk-right"
            ) {

                this.player.play(
                    "fresher-walk-right"
                );
            }

        }

        else if (velocityY < 0) {

            if (
                this.player.anims.currentAnim?.key !==
                "fresher-walk-up"
            ) {

                this.player.play(
                    "fresher-walk-up"
                );
            }

        }

        else if (velocityY > 0) {

            if (
                this.player.anims.currentAnim?.key !==
                "fresher-walk-down"
            ) {

                this.player.play(
                    "fresher-walk-down"
                );
            }
        }


        // =====================================================
        // APPLY MOVEMENT
        // =====================================================

        this.player.setVelocity(
            velocityX,
            velocityY
        );
    }
}


export default WorldScene;