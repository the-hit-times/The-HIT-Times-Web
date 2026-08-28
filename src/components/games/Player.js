export default class Player {
    constructor (scene) {
        this.scene = scene;
    }

    create() {
        const scene = this.scene;

        //charecter sheet 
        const source =
            scene.textures
                .get("characterSheet")
                .getSourceImage();
        
                this.createCharacterFrame(
            source,
            "fresher-down-1",
            300,
            25,
            60,
            106
        );

        // Fresher down 

        this.createCharacterFrame(
            source,
            "fresher-down-2",
            385,
            25,
            60,
            106
        );

        this.createCharacterFrame(
            source,
            "fresher-down-3",
            470,
            25,
            60,
            106
        );

        this.createCharacterFrame(
            source,
            "fresher-down-4",
            555,
            25,
            60,
            106
        );

        // FRESHER UP
        
        this.createCharacterFrame(
            source,
            "fresher-up-1",
            300,
            140,
            60,
            106
        );

        this.createCharacterFrame(
            source,
            "fresher-up-2",
            385,
            140,
            60,
            106
        );

        this.createCharacterFrame(
            source,
            "fresher-up-3",
            470,
            140,
            60,
            106
        );

        this.createCharacterFrame(
            source,
            "fresher-up-4",
            555,
            140,
            60,
            106
        );

        // FRESHER LEFT

        this.createCharacterFrame(
            source,
            "fresher-left-1",
            300,
            260,
            60,
            112
        );

        this.createCharacterFrame(
            source,
            "fresher-left-2",
            385,
            260,
            60,
            112
        );

        this.createCharacterFrame(
            source,
            "fresher-left-3",
            470,
            260,
            60,
            112
        );

        // this.createCharacterFrame(
        //     source,
        //     "fresher-left-4",
        //     555,
        //     260,
        //     60,
        //     112
        // );

        // FRESHER RIGHT

        this.createCharacterFrame(
            source,
            "fresher-right-1",
            300,
            380,
            60,
            112
        );

        this.createCharacterFrame(
            source,
            "fresher-right-2",
            385,
            380,
            60,
            112
        );

        this.createCharacterFrame(
            source,
            "fresher-right-3",
            470,
            380,
            60,
            112
        );

        this.createCharacterFrame(
            source,
            "fresher-right-4",
            555,
            380,
            60,
            112
        );

        // animations

        this.createAnimations();

        // PLAYER SPRITE

        scene.player =
            scene.physics.add.sprite(
                scene.worldWidth / 2,
                scene.worldHeight - 180,
                "fresher-down-1"
            );

        scene.player.setScale(0.5);

        // PLAYER COLLISION BODY

        scene.player.body.setSize(
            30,
            45
        );

        scene.player.body.setOffset(
            15,
            58
        );

        scene.player.setCollideWorldBounds(
            true
        );

        scene.player.play(
            "fresher-idle-down"
        );

        
}

    //create charecter frame

    createCharacterFrame(
        source,
        key,
        x,
        y,
        width,
        height
    ) {

        const canvas =
            document.createElement(
                "canvas"
            );

        canvas.width =
            width;

        canvas.height =
            height;

        const context =
            canvas.getContext("2d");

        context.drawImage(
            source,
            x,
            y,
            width,
            height,
            0,
            0,
            width,
            height
        );

        this.scene.textures.addCanvas(
            key,
            canvas
        );
    }


        //animations
        createAnimations(){
        const scene = this.scene;

        // FRESHER DOWN

        scene.anims.create({

            key: "fresher-walk-down",

            frames: [
                { key: "fresher-down-1" },
                { key: "fresher-down-2" },
                { key: "fresher-down-3" },
                { key: "fresher-down-4" }
            ],

            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({

            key: "fresher-idle-down",

            frames: [
                { key: "fresher-down-1" }
            ],

            frameRate: 1
        });

        // FRESHER UP

        scene.anims.create({

            key: "fresher-walk-up",

            frames: [
                { key: "fresher-up-1" },
                { key: "fresher-up-2" },
                { key: "fresher-up-3" },
                { key: "fresher-up-4" }
            ],

            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({

            key: "fresher-idle-up",

            frames: [
                { key: "fresher-up-1" }
            ],

            frameRate: 1
        });

        // FRESHER LEFT

        scene.anims.create({

            key: "fresher-walk-left",

            frames: [
                { key: "fresher-left-1" },
                { key: "fresher-left-2" },
                { key: "fresher-left-3" },
                // { key: "fresher-left-4" }
            ],

            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({

            key: "fresher-idle-left",

            frames: [
                { key: "fresher-left-1" }
            ],

            frameRate: 1
        });

        // FRESHER RIGHT

        scene.anims.create({

            key: "fresher-walk-right",

            frames: [
                { key: "fresher-right-1" },
                { key: "fresher-right-2" },
                { key: "fresher-right-3" },
                { key: "fresher-right-4" }
            ],

            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({

            key: "fresher-idle-right",

            frames: [
                { key: "fresher-right-1" }
            ],

            frameRate: 1
        });

    }

}