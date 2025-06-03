// control.js - This script is used to load functions running the control panel
// (starting and stopping time).

export default class control {
    /**
     * Toggles the start/stop button
     */
    static toggle() {
        if (window.interval === null) this.start();
        else this.pause();
    }

    /**
     * Starts progressing life
     */
    static start() {
        $("#main_control_pp").css("backgroundImage", "url('assets/png/button_pause.png')");
        window.progressing = true;
        const delay = this.calculateDelay($("#main_control_speed").val()) * 1000;
        window.life.progress();
        window.interval = setInterval(() => { window.life.progress(); }, delay);
    }

    /**
     * Stops progressing life
     */
    static pause() {
        $("#main_control_pp").css("backgroundImage", "url('assets/png/button_play.png')");
        clearInterval(window.interval);
        window.interval = null;
    }

    /**
     * Skips forward an amount of days, based on the value given in control
     */
    static skip() {
        const days = $("#main_control_iter").val();
        window.progressing = true;
        for (let i = 0; i < days && window.progressing; i++) { window.life.progress(); }
        window.progressing = false;
    }

    /**
     * Updates the progress bar style and text at bottom
     */
    static update() {
        // Progress bar style
        const val = $("#main_control_speed").val();
        $("#main_control_speed").css("background", "linear-gradient(to right," +
        `#4caf50 0%, #a7ffaa ${val}%, #d3d3d3 ${val}%, #d3d3d3 100%)`);

        // Tooltip
        const slider = document.getElementById("main_control_speed");
        const thumbOffset = (slider.offsetWidth - 20) * (val / 100);
        $("#main_control_tooltip").css("left", `${thumbOffset + window.innerWidth / 8.77 }px`);
        if (val === "100") $("#main_control_tooltip").html("As fast as possible");
        else $("#main_control_tooltip").html(
            `1 Day = ${this.calculateDelay(val)} seconds \n (+ processing time)`);
        $("#main_control_tooltip").removeClass("fade");
        $("#main_control_tooltip").css("opacity", 1);
        $(document).on("mouseup touchend blur", function () {
            // setTimeout(() => $("#main_control_tooltip").css("opacity", 0), 1000);
            $("#main_control_tooltip").addClass("fade");
            $("#main_control_tooltip").css("opacity", 0);
        });
    }

    /**
     * Calculates the delay for one day, given the value of the slider
     * @param {int} val - A number between 0 to 100 which is determined by the current slider position
     * @returns {float} - A float between 0 to 60, the amount of seconds of delay between each day
     */
    static calculateDelay(val) {
        return (60 * Math.pow(1 - val / 100, 3)).toPrecision(3);
    }
}
