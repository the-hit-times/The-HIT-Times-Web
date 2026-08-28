import { useEffect, useRef } from "react";
import Phaser from "phaser";
import WorldScene from "./Worldscene";

const Game = () => {
    const gameRef = useRef(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,

            parent: gameRef.current,

            backgroundColor: "#000000",

            physics: {
                default: "arcade",
                arcade: {
                    debug: false
                }
            },

            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },

            scene: WorldScene
        };

        const game = new Phaser.Game(config);

        return () => {
            game.destroy(true);
        };
    }, []);

    return (
        <div
            ref={gameRef}
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                touchAction : "none"
            }}
        />
    );
};

export default Game;