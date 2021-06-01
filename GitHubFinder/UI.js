class UI {
    constructor() {
        this.profile = document.getElementById('profile');
        //this.repo = document.getElementById('profile');
    }

    showProfile(user) {
        this.profile.innerHTML = `
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-3">
                        <img class="img-fluid mb-2" src="${user.avatar_url}">
                        <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block">
                            Profile
                        </a>
                    </div>
                    <div class="col-md-9">
                        <span class="btn btn-primary">Public Repos: ${user.public_repos}</span>
                        <span class="btn btn-secondary">Public Gists: ${user.public_gists}</span>
                        <span class="btn btn-success">Followers: ${user.followers}</span>
                        <span class="btn btn-info">Following: ${user.following}</span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company ? null : '-'}</li>
                            <li class="list-group-item">Website/Blog: ${user.blog ? "" : '-'}</li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Member since: ${user.created_at}</li>
                        </ul>
                    </div>
                </div>
            </div> 
            <h3 class="page-heading mb-3">Latest Repos</h3>
            <div id="repos"></div>
        `;
    }

    clearProfile() {
        this.profile.innerHTML = '';
    }

    showAlert(msg, className) {
        this.clearAlert();//clear previous alert
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.searchContainer');
        const search = document.querySelector('.search');
        container.insertBefore(div, search);

        setTimeout(() => {
            this.clearAlert();
        }, 2000);
    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if (currentAlert) {
            currentAlert.remove();
        }
    }

    showRepos(repos) {
        let output = '';
        console.log(repos);
        repos.forEach(function (repo) {
            output += `
                <div class="card card-body mb-2">
                    <div class="row">
                        <div class="col-md-6">
                            <a href=${repo.html_url} target="_blank">${repo.name}</a>
                        </div>
                        <div class="col-md-6">
                            <span class="btn btn-primary">Stars: ${repo.stargazers_count}</span>
                            <span class="btn btn-secondary">Watchers: ${repo.watchers}</span>
                            <span class="btn btn-success">Forks: ${repo.forks_count}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        document.getElementById('repos').innerHTML = output;
    }
}