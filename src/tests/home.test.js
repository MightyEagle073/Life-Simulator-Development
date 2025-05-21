import $ from "jquery";
import { readFileSync } from "fs";
import { join } from "path";
import misc from "../scripts/misc";

describe("home screen tests", () => {
    beforeEach(() => {
        const html = readFileSync(join(import.meta.dirname, "../home.html"), "utf-8");
        document.body.innerHTML = html;
    });

    it("shows the newLife overlay when the button is clicked", () => {
        // $("#newLife").trigger("click");
        expect($("#newLife_overlay").css("display")).toBe("block");
        expect($("#continueLife_overlay").css("display")).toBe("none");
    });

    // it("tests background appilcation", () => {
    //     const bg = $("body").css("backgroundImage");
    //     expect(bg).toBe("sda");
    // });
});
