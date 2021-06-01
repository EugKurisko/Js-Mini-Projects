class GitHub {
    constructor() {
        this.client_id = 'f1ee5201eeb70d5da217';
        this.client_secret = '1c95e12b1b33facf30e5138a82c1ae1edaf5b639';
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    async getUser(user) {
        const userProfileResponse = await fetch(`https://api.github.com/users/${user}
        ?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const userReposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profile = await userProfileResponse.json();
        const repos = await userReposResponse.json();

        return {
            profile,
            repos
        }
    }
}