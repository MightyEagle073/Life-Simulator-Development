// htmlUpdate.js - Script containing htmlUpdate(), which updates all html on the
// main page upon life load or life progression

import Life from "../classes/Life.js";

/**
 * Updates the html page with current life values
 */
export default function htmlUpdate() {
    // Define constants
    /** @type {Life} */const life = window.life;
    const launchBalance = life.financials.balance.format();
    const launchNetWorth =  life.financials.netWorth.format();
    let gender;
    if (life.gender === "m") gender = "Male";
    else if (life.gender === "f") gender = "Female";

    // Change text
    $("#main_diary_h1").html(`${life.name.format()}'s Diary`);
    $("#main_diary_p").html(`${life.diary.join("<br>")}`);
    $("#main_info_age").html(`Age: ${life.age.years} years ${life.age.days} days`);
    $("#main_info_gender").html(`Gender: ${gender}`);
    $("#main_info_balance").html(`Balance: ${launchBalance}`);
    $("#main_info_netWorth").html(`Net Worth: ${launchNetWorth}`);
    $("#main_info_birthday").html("Birthday: " + life.birthday.format("dd/mm/yyyy"));
    $("#main_control_currentDate").html(life.date.format("Date: dd/mm/yyyy"));

    // Make sure that the diary is scrolled to the bottom
    $("#main_diary_body").scrollTop($("#main_diary_body")[0].scrollHeight);
}
