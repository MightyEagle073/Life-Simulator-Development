import Life from "../scripts/Life";
import LifeDate from "../scripts/LifeDate";
import Period from "../scripts/Period";

describe("Life tests", () => {
    it("tests if creating a new life works, and refetching it does not change it", () => {
        const life = new Life({ date: new Date() });
        const stringLife = JSON.stringify(life);
        const reobjectedLife = new Life(JSON.parse(stringLife));
        expect(life).toEqual(reobjectedLife);
    });
    it("tests basic progressing tasks", () => {
        const life = new Life();
        life.progress();
        expect(life.date).toEqual({ year: 1970, month: 1, day: 2 });
        expect(life.age).toEqual({ years: 0, days: 1 });
    });
    it("tests dying", () => {
        const life = new Life();
        life.health.lifespan = new Period({ years: 0, days: 1 });
        life.progress();
        console.log(life);
    });
});
