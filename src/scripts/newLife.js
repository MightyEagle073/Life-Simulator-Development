// This script contains functions running all things related to starting a new life.

import { db } from "./database.js";
import misc from "./misc.js";
import dates from "./dates.js";

export default class newLife {
    // Function 1: This function activates when user tries to start a life
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
            const date = $("#newLife_dob").val();
            misc.display("newLife2_yes", "block");
            misc.display("newLife2_no", "block");
            $("#newLife2_h1").html("Start Life?");
            $("#newLife2_p").html(
                `Would you like to start the life of 
                <strong>${firstName} ${surname}</strong>, 
                starting from <strong>${dates.convert_calendar_date(date)}</strong>?`
            );
            misc.display("newLife2_overlay", "block");
        }
    }

    // Function 2 - Activates when user is sure they want to start their life
    static create() {
        const info = db.lifeInformation;
        info.status = 1;
        info.name.first = $("#newLife_firstName").val();
        info.name.last = $("#newLife_surname").val();
        info.date = info.birthday = dates.convert_calendar_dict($("#newLife_dob").val());
        if ($("#newLife_gender_male").prop("checked")) info.gender = "m";
        else if ($("#newLife_gender_female").prop("checked")) info.gender= "f";
        let iqX = Math.random();
        if (iqX >= 0.5) {
            info.iq = Math.round(8 * Math.PI * Math.pow(Math.asin(2 * iqX - 1), 2.5) + 100);
        } else {
            iqX = 1 - iqX;
            info.iq = Math.round(-5 * Math.PI * Math.pow(Math.asin(2 * iqX - 1), 2.5) + 100);
        }
        console.log(info);
        localStorage.setItem("lifeTransfer", JSON.stringify(info));
        window.location.href = "main.html";
    }
}
