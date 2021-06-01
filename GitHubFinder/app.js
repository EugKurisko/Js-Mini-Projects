let searchUser;
const user = new GitHub();
const ui = new UI();
document.getElementById('searchUser').addEventListener('keyup', findUser);

function findUser(e) {
    searchUser = e.target.value;
    console.log(searchUser);
    if (searchUser !== '') {
        user.getUser(searchUser).then((data) => {
            if (data.profile.message === 'Not Found') {
                ui.showAlert('User not found', 'alert alert-danger');
            } else {
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
            }
        }).catch(err => console.log(err));

    } else {
        ui.clearProfile();
    }
}