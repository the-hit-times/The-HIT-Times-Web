export default class MapCollisions {
    constructor(scene) {
        this.scene = scene;
        this.colliders = null;
    }

    create() {
        const scene = this.scene;

        this.colliders =
            scene.physics.add.staticGroup();


        // =====================================================
        // RECTANGLE COLLIDER HELPER
        // =====================================================

        const addRectangleCollider =
            (
                x,
                y,
                width,
                height
            ) => {

                const collider =
                    scene.add.rectangle(
                        x,
                        y,
                        width,
                        height
                    );

                collider.setVisible(
                    false
                );

                scene.physics.add.existing(
                    collider,
                    true
                );

                this.colliders.add(
                    collider
                );
            };


        // =====================================================
        // CIRCLE COLLIDER HELPER
        // =====================================================

        const addCircleCollider =
            (
                x,
                y,
                radius
            ) => {

                const collider =
                    scene.add.circle(
                        x,
                        y,
                        radius
                    );

                collider.setVisible(
                    false
                );

                scene.physics.add.existing(
                    collider,
                    true
                );

                this.colliders.add(
                    collider
                );
            };


        // =====================================================
        // MAIN BUILDING
        // =====================================================

        // addRectangleCollider(
        //     765,
        //     155,
        //     480,
        //     270
        // );

        //  HIT 4 Pillars
        addRectangleCollider(
            835,  //x
            584,  //y
            480,  //width
            270   //height
        );

        // R.N Tagore
        addRectangleCollider(
            520,  //x
            630,  //y
            80,  //width
            170   //height
        );
        // Einstien
        addRectangleCollider(
            1155,  //x
            630,  //y
            80,  //width
            170   //height
        );

        //upper border
        addRectangleCollider(
            700,  //x
            10,  //y
            1530,  //width
            70   //height
        );
        //right border
        addRectangleCollider(
            1450,  //x
            10,  //y
            250,  //width
            1530   //height
        );


        // =====================================================
        // LIBRARY
        // =====================================================

        addRectangleCollider(
            145,
            630,
            420,
            250
        );

        //gungchil
        addRectangleCollider(
            157,
            160,
            320,
            150
        );

        //HIT STATUE
        addRectangleCollider(
            827,
            835,
            160,
            140
        );

        //PIYA MILAN CHOWK
        addRectangleCollider(
            1200,
            150,
            145,
            200
        );



        // =====================================================
        // SHOP
        // =====================================================

        // addRectangleCollider(
        //     305,
        //     515,
        //     145,
        //     170
        // );


        // =====================================================
        // RESTAURANT
        // =====================================================

        // addRectangleCollider(
        //     655,
        //     720,
        //     160,
        //     190
        // );


        // =====================================================
        // STATIONARY SHOP
        // =====================================================

        // addRectangleCollider(
        //     1205,
        //     730,
        //     175,
        //     170
        // );


        // =====================================================
        // POND
        // =====================================================

        // addCircleCollider(
        //     175,
        //     805,
        //     105
        // );


        // =====================================================
        // TREES
        // =====================================================

        const trees = [

            // [45, 45],  valid tree start here
            // [95, 45],
            // [120, 50],
            // [160, 50],
            // [210, 40],
            // [250, 40],
            // [300, 50],
            // [340, 50],
            // [380, 50],

            // [1160, 45],
            // [1200, 45],
            // [1240, 50],
            // [1280, 50],
            // [1330, 40],
            // [1280, 130],//
            // [1330, 120],//
            // [1370, 40],
            // [1420, 55],
            // [1460, 55],
            // [1500, 45],  valid tree end here

            // [40, 145],
            // [375, 130],
            // [55, 330],
            // [375, 350],
            // [45, 440],
            // [370, 440],

            // [470, 75],
            // [1090, 75],

            // [475, 230],
            // [1090, 230],

            // [440, 350],
            // [1120, 350],

            // [55, 510],
            // [180, 425],
            // [425, 445],

            // [65, 650],
            // [420, 650],

            // [60, 500], valid tree start below
            // [640, 465],
            // [920, 500],
            // [70, 610],

            // [585, 550],
            // [150, 665],
            // [110, 665],


            // [1490, 190],
            // [1510, 300],

            // [1150, 290],
            // [1510, 320],

            // [1510, 420],
            // [1120, 610],

            // [500,580],
            // [500, 600],
            // [495, 780],
            // [495, 740],

            // [930, 470],
            // [890, 595],

            // [1100, 850],

            // [1456, 700],
            // [1496, 700],
            // [1496, 760],
            // [1456, 800],
            // [1420, 850],

            // [40, 920],
            // [50, 680],

            // [370, 880],
            // [410, 880],
            // [1080, 860],
            // [1120, 860],

            // [1390, 830],  
            // [1390, 870],
            // [1510, 850],
            // [1470, 850]   valid tree end here
        ];


        trees.forEach(
            ([x, y]) => {

                addCircleCollider(
                    x,
                    y,
                    18
                );
            }
        );


        // =====================================================
        // PLAYER ↔ MAP COLLISION
        // =====================================================

        scene.physics.add.collider(
            scene.player,
            this.colliders
        );
        
        return this.colliders
    }

}