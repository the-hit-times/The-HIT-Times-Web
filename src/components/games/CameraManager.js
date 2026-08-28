export default class CameraManager {
    constructor(scene) {
        this.scene = scene;
    }

    setup() {
        const scene = this.scene;

        const camera =
            scene.cameras.main;

        camera.setBounds(
            0,
            0,
            scene.worldWidth,
            scene.worldHeight
        );

        this.updateCameraZoom();

        camera.startFollow(
            scene.player,
            true,
            0.08,
            0.08
        );
    }

        updateCameraZoom() {
            const scene = this.scene
        const camera =
            scene.cameras.main;

        const screenWidth =
            scene.scale.width;

        const screenHeight =
            scene.scale.height;

        const zoomX =
            screenWidth /
            scene.worldWidth;

        const zoomY =
            screenHeight /
            scene.worldHeight;

        const zoom =
            Math.max(
                zoomX,
                zoomY
            );

        camera.setZoom(zoom);
    }


}