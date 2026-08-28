export default class Joystick {

    constructor(scene) {
        this.scene = scene;

        this.baseRadius = 55;
        this.thumbRadius = 25;

        this.vector = { x: 0, y: 0 };
        this.isActive = false;
        this.pointerId = null;
    }

    create() {
        const scene = this.scene;

        // desktop/mouse devices don't need this at all
        if (!scene.sys.game.device.input.touch) {
            return;
        }

        this.base = scene.add.circle(0, 0, this.baseRadius, 0xffffff, 0.25);
        this.thumb = scene.add.circle(0, 0, this.thumbRadius, 0xffffff, 0.5);

        this.base.setScrollFactor(0);
        this.thumb.setScrollFactor(0);

        this.base.setDepth(9000);
        this.thumb.setDepth(9001);

        this.base.setVisible(false);
        this.thumb.setVisible(false);

        scene.input.on("pointerdown", this.onPointerDown, this);
        scene.input.on("pointermove", this.onPointerMove, this);
        scene.input.on("pointerup", this.onPointerUp, this);
    }

    onPointerDown(pointer) {
        const scene = this.scene;

        if (scene.interactionManager?.isInteractionOpen) return;

        // don't hijack taps meant for the talk/dialogue buttons
        if (scene.input.hitTestPointer(pointer).length > 0) return;

        this.pointerId = pointer.id;
        this.isActive = true;

        this.originX = pointer.x;
        this.originY = pointer.y;

        this.base.setPosition(this.originX, this.originY);
        this.thumb.setPosition(this.originX, this.originY);

        this.base.setVisible(true);
        this.thumb.setVisible(true);
    }

    onPointerMove(pointer) {
        if (!this.isActive || pointer.id !== this.pointerId) return;

        const dx = pointer.x - this.originX;
        const dy = pointer.y - this.originY;

        const distance = Math.min(Math.sqrt(dx * dx + dy * dy), this.baseRadius);
        const angle = Math.atan2(dy, dx);

        this.thumb.setPosition(
            this.originX + Math.cos(angle) * distance,
            this.originY + Math.sin(angle) * distance
        );

        this.vector.x = Math.cos(angle) * (distance / this.baseRadius);
        this.vector.y = Math.sin(angle) * (distance / this.baseRadius);
    }

    onPointerUp(pointer) {
        if (pointer.id !== this.pointerId) return;

        this.isActive = false;
        this.pointerId = null;

        this.vector.x = 0;
        this.vector.y = 0;

        this.base.setVisible(false);
        this.thumb.setVisible(false);
    }
}