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
                            messages: [`Sure bro, lemme walk you through the entry gates of our college life`,
                                `proceed cautiously though, you have been warned mate.`,
                                ` The 1st Gate that harbours hues of pink, peach, white and blue, offers the best chai and nimbu paani that one could ask for.`,
                                `Then let's take you through the theks, having the best of maggie bhajas and South Indian food, presenting to you the 2nd and the 3rd gates.`,
                                `Bonus Tip: The sitting place between these two gates offers a picturesque view of the lakes and the train that passes by.`
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
                            messages: [`Goodness gracious, a book reader, here in HIT?`,
                                `Well, this is the Aryabhatta Central Library.`,
                                ` It has three reading halls where students can study and collaborate. The library operates seamlessly, as it is tech-enabled with a computer system.`,
                                `It maintains a vast catalogue of books,references and resources for competitive examinations.`
                            ]
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
                            messages: [`Welcome to your soon-to-be unofficial Adda– Gangchill.`,
                                `It's a small store just outside the P2 Hostel. Students can get all their basic amenities as well as food and snacks here.`,
                                `This will probably be the spot you spend most evenings and sometimes even full days of your college life at.`, `Gotta go now, see you later kiddo.`
                            ]
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
                            messages: [`Filled your backpacks? Let's fill our bellies, shall we?`,
                                `Sticking close to DS stands our Garden Restaurant.`,
                                `They've got a lot of delicious options to choose from and enjoy here. It's also a great place to sit, eat and hang out with your friends.`
                            ]
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
                            messages: [`Need to get fit or in need of some sheets?`,
                                `Needs got you covered for it.`,
                                `It's basically the fitness building. It has gyms and yoga rooms along with all sorts of equipment for both Girls and Boys.`,
                                `It also has a small store inside where you can get stationary, xerox as well as refreshments.`,
                                `Go on and discover the next location.`
                            ]
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
                            messages: [`Yo kiddo! There is your have-it-all store– Sankhachil`,
                                `basically your one-stop departmental store (DS). You can get almost everything you need here, from stationery and snacks to print outs.`
                            ]
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
                            messages: [`A bit sporty are you, ehh?`,
                                `This is the basketball court and that ground opposite it is the P2 ground.`,
                                `As the name describes, all the basketball tournaments take place here.`,
                                `There P2 ground serves as the competing ground for Football as well as Cricket tournaments. It also serves as the spot for the annual sports meet.`
                            ]
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