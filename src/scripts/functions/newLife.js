// This script contains functions running all things related to starting a new life.

import Life from "../classes/Life.js";
import LifeDate from "../classes/LifeDate.js";
import { Gender } from "../enums.js";
import misc from "./misc.js";

export default class newLife {
    /**
     * This function activates when user tries to start a life
     */
    static confirm() {
        // If first name is invalid
        if ($("#newLife_firstName").val().length === 0) {
            $("#newLife2_h1").html("Invalid First Name!");
            $("#newLife2_p").html(
                "Please enter a first name. Do you really want your character to live their life " +
                "without a name? Imagine how much they'll get bullied!"
            );
            misc.display("newLife2_yes", "none");
            misc.display("newLife2_no", "none");
            misc.display("newLife2_overlay", "block");
        }
        // If surname is invalid
        else if ($("#newLife_surname").val().length === 0) {
            $("#newLife2_h1").html("Invalid Surname!");
            $("#newLife2_p").html(
                "Please enter a surname. You can't just have someone with a first name but no last name. " +
                "Imagine your your birth certificate with just \"John\". That would be awkward wouldn't it?"
            );
            misc.display("newLife2_yes", "none");
            misc.display("newLife2_no", "none");
            misc.display("newLife2_overlay", "block");
        }
        // If gender is invalid
        else if (
            $("#newLife_gender_male").prop("checked") === false &&
            $("#newLife_gender_female").prop("checked") === false
        ) {
            $("#newLife2_h1").html("Invalid Gender!");
            $("#newLife2_p").html(
                "Please enter a gender. I know some people don't really like to identify them as " +
                "either Male or Female but you got to be born either of the two!"
            );
            misc.display("newLife2_yes", "none");
            misc.display("newLife2_no", "none");
            misc.display("newLife2_overlay", "block");
        }
        // If date is invalid
        else if ($("#newLife_dob").val().toString().length === 0) {
            $("#newLife2_h1").html("Invalid Date!");
            $("#newLife2_p").html(
                "Please enter a date of birth. I haven't heard of anyone who was never born, and " +
                "just exists. Maybe you're one but Life Simulator could only simulate lives of mortals!"
            );
            misc.display("newLife2_yes", "none");
            misc.display("newLife2_no", "none");
            misc.display("newLife2_overlay", "block");
        }
        // If all is valid
        else {
            const firstName = $("#newLife_firstName").val();
            const surname = $("#newLife_surname").val();
            const date = new LifeDate($("#newLife_dob").val());
            misc.display("newLife2_yes", "block");
            misc.display("newLife2_no", "block");
            $("#newLife2_h1").html("Start Life?");
            $("#newLife2_p").html(
                `Would you like to start the life of 
                <strong>${firstName} ${surname}</strong>, 
                starting from <strong>${date.format("dd/mm/yyyy")}</strong>?`
            );
            misc.display("newLife2_overlay", "block");
        }
    }

    /** Activates when user is sure they want to start their life
     *
     */
    static create() {
        const info = new Life();
        info.status = 1;
        info.name.first = $("#newLife_firstName").val();
        info.name.last = $("#newLife_surname").val();
        info.birthday = info.date = new LifeDate($("#newLife_dob").val());
        if ($("#newLife_gender_male").prop("checked")) info.gender = Gender.MALE;
        else if ($("#newLife_gender_female").prop("checked")) info.gender= Gender.FEMALE;
        let iqX = Math.random();
        if (iqX >= 0.5) {
            info.skills.iq = Math.round(8 * Math.PI * Math.pow(Math.asin(2 * iqX - 1), 2.5) + 100);
        } else {
            iqX = 1 - iqX;
            info.skills.iq = Math.round(-5 * Math.PI * Math.pow(Math.asin(2 * iqX - 1), 2.5) + 100);
        }
        console.log(info);
        localStorage.setItem("lifeTransfer", JSON.stringify(info));
        window.location.href = "main.html";
    }
}
