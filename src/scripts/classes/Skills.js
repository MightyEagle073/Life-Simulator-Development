// Skills.js - The script containing the skill object

/**
 * Skill object - Information about the skills the player currently has
 */
export default class Skills {
    constructor(data = {}) {
        this.iq = data.iq ?? 100;
    }
}
