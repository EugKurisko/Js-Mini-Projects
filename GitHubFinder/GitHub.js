class GitHub {
    constructor(user) {
        this.user = user;
    }

    async getUser(url) {
        const response = await fetch(url);
        //response
    }

}