const axios = require("axios");

class OpenCollective {
  /**
   * Creates a new OpenCollective instance.
   * @param {string} id Open Collective project id.
   * @constructor
   */
  constructor(id) {
    this.id = id;
    this.members = [];
    this._fetched = false;
  }

  /**
   * Fetches the member list for an Open Collective project.
   * @param {string} id Name of the Open Collective project to fetch member list for.
   * @returns {array|undefined} Returns an array of project members, or `undefined` if an error occurred.
   */
  async fetch(id = this.id) {
    if (id) {
      try {
        const url = `https://opencollective.com/${id}/members.json`;
        // console.info(`Fetching ${url}`);
        const { data } = await axios.get(url);
        this.members = data;
        this._fetched = true;
        return this.members;
      } catch (err) {
        console.error(err.message);
        process.exitCode = 2;
        return;
      }
    }
    process.exitCode = 1;
    throw new Error("Unknown OpenCollective project");
  }

  /**
   * Set member data from an array instead of loading from a URL (you know, in case you want to cache the results).
   * @param {array} data 
   */
  async load(data) {
    if (!Array.isArray(data)) {
      throw new Error(`load() method expected an array. Got "${typeof data}"`)
    }
    this.members = data;
    this._fetched = true;
  }

  /**
   * Searches the Open Collective member list based on specified (1) Open Collective username, (2) email address, (3) GitHub username, or (4) Twitter username.
   * @param {object} data An object containing at least one of `opencollective`, `email`, `github`, and/or `twitter` properties.
   * @returns {object|undefined} An Open Collective member object if a match was found; otherwise returns `undefined`.
   */
  async isOpenCollectiveMember(data = {}) {
    // Make sure the opencollective members.json data has been fetched.
    if (!this._fetched) {
      await this.fetch();
    }
    return this.members.find((member) => {
      if (
        this._eq(data.opencollective, this._userid(member.profile)) ||
        this._eq(data.email, member.email) ||
        this._eq(data.github, this._userid(member.github)) ||
        this._eq(data.twitter, this._userid(member.twitter))
      ) {
        return true;
      }
      return false;
    });
  }

  /**
   * Extracts Open Collective, GitHub, or Twitter usernames based on specified URL.
   * @param {string} uri 
   * @returns {string} A username, if found; otherwise returns the original string.
   */
  _userid(uri = "") {
    if (uri) {
      // Convert "https://twitter.com/username"-esque to "username".
      return new URL(uri).pathname.replace(/^\/+/, "");
    }
    return uri;
  }

  /**
   * Compares two string values (case insensitive), and ensures the first string isn't falsy/empty.
   * @param {string} string1 
   * @param {string} string2 
   * @returns {boolean} `true` if the strings match, `false` otherwise.
   */
  _eq(string1, string2 = "") {
    // Check `string1` is truthy, and then do a case insensitive string check on `string1` and `string2`.
    return string1 && string1.toLowerCase() === string2?.toLowerCase();
  }
}

module.exports = OpenCollective;
