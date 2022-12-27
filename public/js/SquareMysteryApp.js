class SquareMysteryApp {
    constructor(vueElement, opt) {

        const defaults = {
            'delimiters': ['[[', ']]'],
        }

        const options = {...defaults, ...opt};

        const {createApp} = Vue

        const app = createApp({

            data() {
                return {
                    canvas: null,
                    box_width: 500,
                    coord_x: 400,
                    coord_y: 300,
                    area_blue: 0,
                    area_red: 0,
                    area_yellow: 0,
                    area_green: 0,
                    drag_ok: false,
                }
            },
            watch: {
                // Auto scroll to bottom, if there are new messages
                coord_x(newValue, oldValue) {
                    this.draw();
                    this.calculate();
                },
                coord_y(newValue, oldValue) {
                    this.draw();
                    this.calculate();
                }
            },

            // Lifecycle hooks are called at different stages
            // of a component's lifecycle.
            // This function will be called when the component is mounted.
            async mounted() {

                await this.initialize();
                await this.draw();
                await this.calculate();
            },

            methods: {
                async initialize() {
                    window.addEventListener('mouseup', (event) => {
                        this.drag_ok = false;
                    });

                    const rangeX = document.getElementById("rangeX");
                    rangeX.setAttribute('max', this.box_width);
                    rangeX.setAttribute('min', 0);

                    const rangeY = document.getElementById("rangeY");
                    rangeY.setAttribute('max', this.box_width);
                    rangeY.setAttribute('min', 0);
                },

                async draw() {
                    this.canvas = document.getElementById("canvasSquareMystery");

                    this.canvas.setAttribute('height', this.box_width);
                    this.canvas.setAttribute('width', this.box_width);
                    if (this.canvas.getContext) {
                        const ctx = this.canvas.getContext("2d");

                        // Quadrat
                        ctx.strokeRect(0, 0, this.box_width, this.box_width);

                        // listen for mouse events
                        this.canvas.onmousedown = this.mouseDown;
                        this.canvas.onmouseup = this.mouseUp;
                        this.canvas.onmousemove = this.mouseMove;

                        // 1. quadrant
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(this.box_width / 2, 0);
                        ctx.lineTo(this.coord_x, this.coord_y);
                        ctx.lineTo(0, this.box_width / 2);
                        ctx.lineTo(0, 0);
                        ctx.closePath();
                        ctx.fillStyle = "blue";
                        ctx.fill();

                        // 2. quadrant
                        ctx.beginPath();
                        ctx.moveTo(this.box_width, 0);
                        ctx.lineTo(this.box_width / 2, 0);
                        ctx.lineTo(this.coord_x, this.coord_y);
                        ctx.lineTo(this.box_width, this.box_width / 2);
                        ctx.lineTo(this.box_width, 0);
                        ctx.closePath();
                        ctx.fillStyle = "red";
                        ctx.fill();

                        // 3. quadrant
                        ctx.beginPath();
                        ctx.moveTo(this.box_width, this.box_width);
                        ctx.lineTo(this.box_width, this.box_width / 2);
                        ctx.lineTo(this.coord_x, this.coord_y);
                        ctx.lineTo(this.box_width / 2, this.box_width);
                        ctx.lineTo(this.box_width, this.box_width);
                        ctx.closePath();
                        ctx.fillStyle = "yellow";
                        ctx.fill();

                        // 4. quadrant
                        ctx.beginPath();
                        ctx.moveTo(0, this.box_width);
                        ctx.lineTo(0, this.box_width / 2);
                        ctx.lineTo(this.coord_x, this.coord_y);
                        ctx.lineTo(this.box_width / 2, this.box_width);
                        ctx.lineTo(0, this.box_width);
                        ctx.closePath();
                        ctx.fillStyle = "green";
                        ctx.fill();
                    }
                },

                async calculate() {
                    const half_box = this.box_width / 2;

                    const triangle_1 = half_box * this.coord_y / 2;
                    const triangle_2 = half_box * this.coord_y / 2;

                    const triangle_3 = half_box * (this.box_width - this.coord_x) / 2;
                    const triangle_4 = half_box * (this.box_width - this.coord_x) / 2;

                    const triangle_5 = half_box * (this.box_width - this.coord_y) / 2;
                    const triangle_6 = half_box * (this.box_width - this.coord_y) / 2;

                    const triangle_7 = half_box * this.coord_x / 2;
                    const triangle_8 = half_box * this.coord_x / 2;

                    this.area_blue = Math.round(triangle_8 + triangle_1);
                    this.area_red = Math.round(triangle_2 + triangle_3);
                    this.area_yellow = Math.round(triangle_4 + triangle_5);
                    this.area_green = Math.round(triangle_6 + triangle_7);
                },

                mouseDown() {
                    this.drag_ok = true;
                },

                mouseUp() {
                    this.drag_ok = false;
                },

                mouseMove(event) {
                    const pos = this.getMousePos(event);

                    let do_return = false;

                    if (pos.x <= 1) {
                        this.coord_x = 0;
                        do_return = true;
                    }
                    if (pos.y <= 1) {
                        this.coord_y = 0;
                        do_return = true;
                    }

                    if (pos.x >= this.box_width - 1) {
                        this.coord_x = this.box_width;
                        do_return = true;
                    }

                    if (pos.y >= this.box_width - 1) {
                        this.coord_y = this.box_width;
                        do_return = true;
                    }

                    if (do_return) {
                        return;
                    }

                    if (this.drag_ok) {
                        this.coord_x = Math.round(pos.x);
                        this.coord_y = Math.round(pos.y);
                    }
                },

                getMousePos(evt) {
                    const rect = this.canvas.getBoundingClientRect();
                    return {
                        x: evt.clientX - rect.left,
                        y: evt.clientY - rect.top
                    };
                },
            },
        });

        app.config.compilerOptions.delimiters = ['[[', ']]'];
        const mountedApp = app.mount(vueElement);

        return mountedApp;
    }
}
