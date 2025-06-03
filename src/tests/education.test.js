import { expect } from "vitest";
import Life from "../scripts/classes/Life";

describe("Education tests", () => {
    it("tests the education system under regular conditions", () => {
        const life = new Life({ date: { year: 2003, month: 1, day: 1 } });

        while (life.date.getCode() < 20080131) life.progress();
        expect(life.education.status).toEqual(1);
        expect(life.education.stage).toEqual(0);
        expect(life.education.grade).toEqual(0);
        expect(life.diary[life.diary.length - 1].search("31/01/2008 - I started my")).not.toEqual(-1);

        while (life.date.getCode() < 20081216) life.progress();
        expect(life.education.status).toEqual(2);
        expect(life.education.stage).toEqual(0);
        expect(life.education.grade).toEqual(0);
        expect(life.diary[life.diary.length - 1].search("16/12/2008 - I finished")).not.toEqual(-1);

        while (life.date.getCode() < 20090131) life.progress();
        expect(life.education.status).toEqual(1);
        expect(life.education.stage).toEqual(0);
        expect(life.education.grade).toEqual(1);
        expect(life.diary[life.diary.length - 1].search("31/01/2009 - I started Year 1")).not.toEqual(-1);

        while (life.date.getCode() < 20091216) life.progress();
        expect(life.education.status).toEqual(2);
        expect(life.education.stage).toEqual(0);
        expect(life.education.grade).toEqual(1);
        expect(life.diary[life.diary.length - 1].search("16/12/2009 - I finished Year 1")).not.toEqual(-1);

        while (life.date.getCode() < 20140131) life.progress();
        expect(life.education.status).toEqual(1);
        expect(life.education.stage).toEqual(0);
        expect(life.education.grade).toEqual(6);
        expect(life.diary[life.diary.length - 1].search("31/01/2014 - I started Year 6")).not.toEqual(-1);

        while (life.date.getCode() < 20141216) life.progress();
        expect(life.education.status).toEqual(2);
        expect(life.education.stage).toEqual(0);
        expect(life.education.grade).toEqual(6);
        expect(life.diary[life.diary.length - 1].search("16/12/2014 - I graduated at")).not.toEqual(-1);

        while (life.date.getCode() < 20150131) life.progress();
        expect(life.education.status).toEqual(1);
        expect(life.education.stage).toEqual(1);
        expect(life.education.grade).toEqual(0);
        expect(life.diary[life.diary.length - 1].search("31/01/2015 - I was enrolled")).not.toEqual(-1);

        while (life.date.getCode() < 20151216) life.progress();
        expect(life.education.status).toEqual(2);
        expect(life.education.stage).toEqual(1);
        expect(life.education.grade).toEqual(0);
        expect(life.diary[life.diary.length - 1].search("16/12/2015 - I finished Year 7")).not.toEqual(-1);

        while (life.date.getCode() < 20191012) life.progress();
        expect(life.education.status).toEqual(1);
        expect(life.education.stage).toEqual(1);
        expect(life.education.grade).toEqual(5);
        expect(life.diary[life.diary.length - 1].search("12/10/2019 - I started Year 12")).not.toEqual(-1);

        while (life.date.getCode() < 20201106) life.progress();
        expect(life.education.status).toEqual(3);
        expect(life.education.stage).toEqual(1);
        expect(life.education.grade).toEqual(5);
        expect(life.diary[life.diary.length - 1].search("06/11/2020 - I graduated at")).not.toEqual(-1);
    });
});
