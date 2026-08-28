export default class Senior {
    constructor(scene) {
        this.scene = scene;
        this.seniors = []
    }

    // Create Senior
    createSenior(x, y, details) {
        const scene = this.scene;

        const senior =
            scene.physics.add.sprite(
                x,
                y,
                "senior-down-1"
            );

        senior.setScale(0.53);

        senior.setCollideWorldBounds(
            true
        );

        senior.body.setImmovable(
            true
        );

        senior.body.setSize(
            30,
            45
        );

        senior.body.setOffset(
            15,
            58
        );

        senior.play(
            "senior-idle"
        );


        senior.seniorId =
            details.id;

        senior.seniorDetails =
            details;


        return senior;
    }

    createFrames(){
        const seniorSource =
            this.scene.textures
                .get("characterSheet")
                .getSourceImage();


        // SENIOR DOWN

        this.createCharacterFrame(
            seniorSource,
            "senior-down-1",
            300,
            540,
            60,
            106
        );

        this.createCharacterFrame(
            seniorSource,
            "senior-down-2",
            385,
            540,
            60,
            106
        );

        this.createCharacterFrame(
            seniorSource,
            "senior-down-3",
            470,
            540,
            60,
            106
        );

        this.createCharacterFrame(
            seniorSource,
            "senior-down-4",
            555,
            540,
            60,
            106
        );

        // SENIOR UP

        this.createCharacterFrame(
            seniorSource,
            "senior-up-1",
            300,
            660,
            60,
            106
        );

        this.createCharacterFrame(
            seniorSource,
            "senior-up-2",
            385,
            660,
            60,
            106
        );

        this.createCharacterFrame(
            seniorSource,
            "senior-up-3",
            470,
            660,
            60,
            106
        );

        this.createCharacterFrame(
            seniorSource,
            "senior-up-4",
            555,
            660,
            60,
            106
        );

        // SENIOR LEFT

        this.createCharacterFrame(
            seniorSource,
            "senior-left-1",
            300,
            780,
            60,
            112
        );

        this.createCharacterFrame(
            seniorSource,
            "senior-left-2",
            385,
            780,
            60,
            112
        );

        this.createCharacterFrame(
            seniorSource,
            "senior-left-3",
            470,
            780,
            60,
            112
        );

        this.createCharacterFrame(
            seniorSource,
            "senior-left-4",
            555,
            780,
            60,
            112
        );

        // SENIOR RIGHT

        this.createCharacterFrame(
            seniorSource,
            "senior-right-1",
            300,
            900,
            60,
            112
        );

        this.createCharacterFrame(
            seniorSource,
            "senior-right-2",
            385,
            900,
            60,
            112
        );

        this.createCharacterFrame(
            seniorSource,
            "senior-right-3",
            470,
            900,
            60,
            112
        );

        this.createCharacterFrame(
            seniorSource,
            "senior-right-4",
            555,
            900,
            60,
            112
        );
    }

    //Create All Seniors

    createSeniors() {
        this.createFrames(); //new
        this.createAnimations()
        this.seniors = [];
        
                this.seniors.push(
                    this.createSenior(
                        525,
                        717,
                        {
                            id: 1,
                            name: "TIMES Member",
                            department: "PR",
                            year: "4th Year",
                            messages: ["Hey! I am Rahul. Welcome to college.",
                                "Have you seen our college library?",
                                "If not you should have visit there."
                            ]
                        }
                    )
                );
        
        
                this.seniors.push(
                    this.createSenior(
                        280,
                        730,
                        {
                            id: 2,
                            name: "TIMES Member",
                            department: "Content Writer",
                            year: "4th Year",
                            messages: ["Hey! I am Priya. Need any help?"]
                        }
                    )
                );
        
        
                this.seniors.push(
                    this.createSenior(
                        270,
                        360,
                        {
                            id: 3,
                            name: "TIMES Member",
                            department: "Graphic Designer",
                            year: "4th Year",
                            messages: ["Hi! I can tell you about the campus."]
                        }
                    )
                );
        
        
                this.seniors.push(
                    this.createSenior(
                        1410,
                        797,
                        {
                            id: 4,
                            name: "TIMES Member",
                            department: "Developer",
                            year: "4th Year",
                            messages: ["Hello! Feel free to ask me anything."]
                        }
                    )
                );
        
        
                this.seniors.push(
                    this.createSenior(
                        1335,
                        170,
                        {
                            id: 5,
                            name: "TIMES Member",
                            department: "Digital Artist",
                            year: "4th Year",
                            messages: ["Welcome! Hope you are enjoying campus."]
                        }
                    )
                );
        
        
                this.seniors.push(
                    this.createSenior(
                        1155,
                        710,
                        {
                            id: 6,
                            name: "TIMES Member",
                            department: "Photographer",
                            year: "4th Year",
                            messages: ["Hi! Let me know if you need any guidance."]
                        }
                    )
                );

                this.seniors.push(
                    this.createSenior(
                        997, //130
                        320, //250
                        {
                            id: 7,
                            name: "TIMES Member",
                            department: "Video Editor",
                            year: "4th Year",
                            messages: ["Hi! Let me know if you need any guidance."]
                        }
                    )
                );

                return this.seniors
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

    createAnimations() {

        const scene = this.scene

        scene.anims.create({

            key: "senior-idle",

            frames: [
                { key: "senior-down-1" }
            ],

            frameRate: 1
        });
    }

}