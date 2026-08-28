import Phaser from "phaser";

export default class InteractionManager {

    constructor(scene) {

        this.scene = scene;

        this.interactionDistance = 100;
        this.nearbySenior = null;
        this.isInteractionOpen = false;

        // =====================================================
        // DIALOGUE STATE
        // =====================================================

        this.dialogueStep = 0;

        this.juniorDialogue =
            "Excuse me bhaiya, can you help me figure out this campus?";
    }


    // =========================================================
    // CREATE
    // =========================================================

    create() {

        this.createTalkPrompt();

        this.createConversationUI();
    }


    // =========================================================
    // TALK PROMPT
    // =========================================================

    createTalkPrompt() {

        const scene = this.scene;

        // const width = 320;
        // const height = 120;

        //temporary
        const width = Math.min(320, scene.scale.width - 40);
        const height = 120;


        this.talkPrompt =
            scene.add.container(
                scene.scale.width / 2,
                scene.scale.height - 110
            );

        this.talkPrompt.setScrollFactor(0);

        this.talkPrompt.setDepth(10000);


        // =====================================================
        // BACKGROUND
        // =====================================================

        const background =
            scene.add.rectangle(
                0,
                0,
                width,
                height,
                0x111111,
                0.96
            );

        background.setStrokeStyle(
            3,
            0xffffff
        );


        // =====================================================
        // TITLE
        // =====================================================

        const text =
            scene.add.text(
                0,
                -32,
                "Talk to Senior?",
                {
                    fontSize: "20px",
                    color: "#ffffff",
                    fontStyle: "bold"
                }
            );

        text.setOrigin(0.5);


        // =====================================================
        // YES BUTTON
        // =====================================================

        const yesBackground =
            scene.add.rectangle(
                -65,
                30,
                90,
                40,
                0x1f7a4d
            );

        yesBackground.setOrigin(0.5);

        yesBackground.setStrokeStyle(
            2,
            0x00ff88
        );

        yesBackground.setInteractive(
            new Phaser.Geom.Rectangle(
                -45,
                -20,
                90,
                40
            ),
            Phaser.Geom.Rectangle.Contains,
            {
                useHandCursor: true
            }
        );


        const yesText =
            scene.add.text(
                -65,
                30,
                "YES",
                {
                    fontSize: "17px",
                    color: "#ffffff",
                    fontStyle: "bold"
                }
            );

        yesText.setOrigin(0.5);


        // =====================================================
        // NO BUTTON
        // =====================================================

        const noBackground =
            scene.add.rectangle(
                65,
                30,
                90,
                40,
                0x7a2929
            );

        noBackground.setOrigin(0.5);

        noBackground.setStrokeStyle(
            2,
            0xff5555
        );

        noBackground.setInteractive(
            new Phaser.Geom.Rectangle(
                -45,
                -20,
                90,
                40
            ),
            Phaser.Geom.Rectangle.Contains,
            {
                useHandCursor: true
            }
        );


        const noText =
            scene.add.text(
                65,
                30,
                "NO",
                {
                    fontSize: "17px",
                    color: "#ffffff",
                    fontStyle: "bold"
                }
            );

        noText.setOrigin(0.5);


        // =====================================================
        // ADD CHILDREN
        // =====================================================

        this.talkPrompt.add([
            background,
            text,
            yesBackground,
            yesText,
            noBackground,
            noText
        ]);


        // =====================================================
        // YES HOVER
        // =====================================================

        yesBackground.on(
            "pointerover",
            () => {

                yesBackground.setFillStyle(
                    0x2fa866
                );
            }
        );


        yesBackground.on(
            "pointerout",
            () => {

                yesBackground.setFillStyle(
                    0x1f7a4d
                );
            }
        );


        // =====================================================
        // YES CLICK
        // =====================================================

        yesBackground.on(
            "pointerdown",
            (pointer) => {

                pointer.event.stopPropagation();

                this.startSeniorConversation();
            }
        );


        // =====================================================
        // NO HOVER
        // =====================================================

        noBackground.on(
            "pointerover",
            () => {

                noBackground.setFillStyle(
                    0xa33a3a
                );
            }
        );


        noBackground.on(
            "pointerout",
            () => {

                noBackground.setFillStyle(
                    0x7a2929
                );
            }
        );


        // =====================================================
        // NO CLICK
        // =====================================================

        noBackground.on(
            "pointerdown",
            (pointer) => {

                pointer.event.stopPropagation();

                this.closeTalkPrompt();
            }
        );


        // =====================================================
        // HIDE INITIALLY
        // =====================================================

        this.talkPrompt.setVisible(false);
    }


    // =========================================================
    // CONVERSATION UI
    // =========================================================

    createConversationUI() {

        const scene = this.scene;

        // const width = 700;
        // const height = 220;

        //temporary 
        const width = Math.min(700, scene.scale.width - 40);
        const height = Math.min(220, scene.scale.height - 40);
        this.conversationWidth = width;

        this.conversationUI =
            scene.add.container(
                scene.scale.width / 2,
                scene.scale.height - 150
            );

        this.conversationUI.setScrollFactor(0);

        this.conversationUI.setDepth(20000);


        // =====================================================
        // BACKGROUND
        // =====================================================

        const background =
            scene.add.rectangle(
                0,
                0,
                width,
                height,
                0x111111,
                0.97
            );

            this.conversationBackground = background;

        background.setStrokeStyle(
            3,
            0xffffff
        );


        // =====================================================
        // SPEAKER NAME
        // =====================================================

        this.conversationName =
            scene.add.text(
                -width / 2 + 25,
                -height / 2 + 25,
                "",
                {
                    fontSize: "24px",
                    color: "#00ff88",
                    fontStyle: "bold"
                }
            );


        // =====================================================
        // SPEAKER INFORMATION
        // =====================================================

        this.conversationInfo =
            scene.add.text(
                -width / 2 + 25,
                -height / 2 + 65,
                "",
                {
                    fontSize: "15px",
                    color: "#aaaaaa"
                }
            );


        // =====================================================
        // MESSAGE
        // =====================================================

        this.conversationMessage =
            scene.add.text(
                -width / 2 + 25,
                -height / 2 + 105,
                "",
                {
                    fontSize: "19px",
                    color: "#ffffff",
                    wordWrap: {
                        width: width - 50
                    }
                }
            );


        // =====================================================
        // NEXT BUTTON
        // =====================================================

        this.nextBackground =
            scene.add.rectangle(
                width / 2 - 65,
                height / 2 - 35,
                90,
                35,
                0x1f7a4d
            );

        this.nextBackground.setInteractive({
            useHandCursor: true
        });

        this.nextBackground.setStrokeStyle(
            2,
            0x00ff88
        );


        this.nextText =
            scene.add.text(
                width / 2 - 65,
                height / 2 - 35,
                "NEXT",
                {
                    fontSize: "14px",
                    color: "#ffffff",
                    fontStyle: "bold"
                }
            );

        this.nextText.setOrigin(0.5);


        // =====================================================
        // NEXT HOVER
        // =====================================================

        this.nextBackground.on(
            "pointerover",
            () => {

                this.nextBackground.setFillStyle(
                    0x2fa866
                );
            }
        );


        this.nextBackground.on(
            "pointerout",
            () => {

                this.nextBackground.setFillStyle(
                    0x1f7a4d
                );
            }
        );


        // =====================================================
        // NEXT CLICK
        // =====================================================

        this.nextBackground.on(
            "pointerdown",
            (pointer) => {

                pointer.event.stopPropagation();

                this.nextDialogue();
            }
        );


        // =====================================================
        // CLOSE BUTTON
        // =====================================================

        this.closeBackground =
            scene.add.rectangle(
                width / 2 - 65,
                height / 2 - 35,
                90,
                35,
                0x7a2929
            );

        this.closeBackground.setInteractive({
            useHandCursor: true
        });

        this.closeBackground.setStrokeStyle(
            2,
            0xff5555
        );


        this.closeText =
            scene.add.text(
                width / 2 - 65,
                height / 2 - 35,
                "CLOSE",
                {
                    fontSize: "14px",
                    color: "#ffffff",
                    fontStyle: "bold"
                }
            );

        this.closeText.setOrigin(0.5);


        // =====================================================
        // CLOSE HOVER
        // =====================================================

        this.closeBackground.on(
            "pointerover",
            () => {

                this.closeBackground.setFillStyle(
                    0xa33a3a
                );
            }
        );


        this.closeBackground.on(
            "pointerout",
            () => {

                this.closeBackground.setFillStyle(
                    0x7a2929
                );
            }
        );


        // =====================================================
        // CLOSE CLICK
        // =====================================================

        this.closeBackground.on(
            "pointerdown",
            (pointer) => {

                pointer.event.stopPropagation();

                this.closeConversation();
            }
        );


        // =====================================================
        // ADD CHILDREN
        // =====================================================

        this.conversationUI.add([
            background,
            this.conversationName,
            this.conversationInfo,
            this.conversationMessage,
            this.nextBackground,
            this.nextText,
            this.closeBackground,
            this.closeText
        ]);


        // =====================================================
        // HIDE INITIALLY
        // =====================================================

        this.conversationUI.setVisible(false);
    }


    // =========================================================
    // UPDATE UI POSITIONS
    // =========================================================

    updateTalkPromptPosition() {

        const scene = this.scene;

        if (!this.talkPrompt) {
            return;
        }

        this.talkPrompt.setPosition(
            scene.scale.width / 2,
            scene.scale.height - 110
        );
    }


    updateConversationUIPosition() {

        const scene = this.scene;

        if (!this.conversationUI) {
            return;
        }

        this.conversationUI.setPosition(
            scene.scale.width / 2,
            scene.scale.height - 150
        );
    }


    updateConversationLayout() {

    const scene = this.scene;

    const width = this.conversationWidth;

    const topPadding = 105;
    const bottomPadding = 60;

    const minHeight = 220;
    const maxHeight = scene.scale.height - 80;

    let height =
        topPadding +
        this.conversationMessage.height +
        bottomPadding;

    height = Phaser.Math.Clamp(height, minHeight, maxHeight);

    const halfHeight = height / 2;

    this.conversationBackground.setSize(width, height);

    this.conversationName.setPosition(-width / 2 + 25, -halfHeight + 25);
    this.conversationInfo.setPosition(-width / 2 + 25, -halfHeight + 65);
    this.conversationMessage.setPosition(-width / 2 + 25, -halfHeight + 105);

    this.nextBackground.setPosition(width / 2 - 65, halfHeight - 35);
    this.nextText.setPosition(width / 2 - 65, halfHeight - 35);

    this.closeBackground.setPosition(width / 2 - 65, halfHeight - 35);
    this.closeText.setPosition(width / 2 - 65, halfHeight - 35);

    this.conversationUI.setPosition(
        scene.scale.width / 2,
        scene.scale.height - 40 - halfHeight
    );
}


    // =========================================================
    // CHECK SENIOR INTERACTION
    // =========================================================

    checkSeniorInteraction() {

        if (this.isInteractionOpen) {
            return;
        }


        const scene = this.scene;

        let closestSenior = null;

        let closestDistance =
            this.interactionDistance;


        scene.seniors.forEach(
            (senior) => {

                const distance =
                    Phaser.Math.Distance.Between(
                        scene.player.x,
                        scene.player.y,
                        senior.x,
                        senior.y
                    );


                if (distance < closestDistance) {

                    closestDistance =
                        distance;

                    closestSenior =
                        senior;
                }
            }
        );


        // =====================================================
        // SENIOR FOUND
        // =====================================================

        if (closestSenior) {

            if (
                this.nearbySenior !==
                closestSenior
            ) {

                this.nearbySenior =
                    closestSenior;

                this.showTalkPrompt();
            }

            return;
        }


        // =====================================================
        // NO SENIOR
        // =====================================================

        if (this.nearbySenior) {

            this.nearbySenior =
                null;

            this.closeTalkPrompt();
        }
    }


    // =========================================================
    // SHOW TALK PROMPT
    // =========================================================

    showTalkPrompt() {

        if (this.isInteractionOpen) {
            return;
        }

        this.talkPrompt.setVisible(true);
    }


    // =========================================================
    // CLOSE TALK PROMPT
    // =========================================================

    closeTalkPrompt() {

        this.talkPrompt.setVisible(false);
    }


    // =========================================================
    // START SENIOR CONVERSATION
    // =========================================================

    startSeniorConversation() {

        if (!this.nearbySenior) {
            return;
        }


        const scene = this.scene;

        const senior =
            this.nearbySenior;

        const seniorDetails =
            senior.seniorDetails;


        // =====================================================
        // OPEN INTERACTION
        // =====================================================

        this.isInteractionOpen =
            true;


        // =====================================================
        // RESET DIALOGUE
        // =====================================================

        this.dialogueStep = 0;


        // =====================================================
        // STOP PLAYER
        // =====================================================

        scene.player.setVelocity(
            0,
            0
        );


        // =====================================================
        // HIDE PROMPT
        // =====================================================

        this.talkPrompt.setVisible(false);


        // =====================================================
        // JUNIOR DIALOGUE
        // =====================================================

        this.conversationName.setText(
            "You"
        );

        this.conversationInfo.setText(
            "Junior"
        );

        this.conversationMessage.setText(
            this.juniorDialogue
        );


        // =====================================================
        // BUTTON STATE
        // =====================================================

        this.nextBackground.setVisible(true);
        this.nextText.setVisible(true);

        this.closeBackground.setVisible(false);
        this.closeText.setVisible(false);


        // =====================================================
        // SHOW CONVERSATION
        // =====================================================

        this.conversationUI.setVisible(true);


        console.log(
            "Junior started conversation with:",
            seniorDetails
        );
    }


    // =========================================================
    // NEXT DIALOGUE
    // =========================================================

   nextDialogue() {

    if (!this.nearbySenior) {
        return;
    }

    const seniorDetails =
        this.nearbySenior.seniorDetails;

    const messages =
        seniorDetails.messages;


    // JUNIOR → FIRST SENIOR MESSAGE
    if (this.dialogueStep === 0) {

        this.dialogueStep = 1;

        this.showSeniorMessage(seniorDetails, 0);

        return;
    }


    // NEXT SENIOR MESSAGE
    const currentIndex = this.dialogueStep - 1;
    const nextIndex = currentIndex + 1;

    if (nextIndex < messages.length) {

        this.dialogueStep += 1;

        this.showSeniorMessage(seniorDetails, nextIndex);
    }
}


// =========================================================
// SHOW A SINGLE SENIOR MESSAGE
// =========================================================

showSeniorMessage(seniorDetails, index) {

    const messages = seniorDetails.messages;
    const isLastMessage = index === messages.length - 1;

    this.conversationName.setText(seniorDetails.name);
    this.conversationInfo.setText(`${seniorDetails.department} • ${seniorDetails.year}`);
    this.conversationMessage.setText(messages[index]);

    this.updateConversationLayout();

    this.nextBackground.setVisible(!isLastMessage);
    this.nextText.setVisible(!isLastMessage);

    this.closeBackground.setVisible(isLastMessage);
    this.closeText.setVisible(isLastMessage);
}


    // =========================================================
    // CLOSE CONVERSATION
    // =========================================================

    closeConversation() {

        this.conversationUI.setVisible(false);

        this.isInteractionOpen = false;

        this.nearbySenior = null;

        this.dialogueStep = 0;
    }


    // =========================================================
    // UPDATE
    // =========================================================

    update() {

        this.checkSeniorInteraction();
    }
}