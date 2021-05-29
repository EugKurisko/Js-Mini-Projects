const searchUser = document.getElementById('searchUser');

const findUser = new GitHub(searchUser);
findUser.getUser(`https://api.github.com/users/`);
