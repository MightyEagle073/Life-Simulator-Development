import Health from "../scripts/Health";

describe("test conversions", () => {
    it("tests random value to lifespan", () => {
        for (let i = 0; i <= 100; i++) {
            console.log(Health.valueToLifespan(i / 100));
        }
    });
});
