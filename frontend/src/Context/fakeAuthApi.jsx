const findUserByUserName = (username, database) => {
	return database.find((user) => user.email === username);
};

export const fakeAuthApi = (username, password, database) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const user = findUserByUserName(username, database);
			if (!user) {
				reject({ success: false, error: 'No such user exist!', status: 401 });
			} else if (user && user.password === password) {
				resolve({ success: true, status: 200, error: '' });
			}
			reject({
				success: false,
				status: 401,
				error: 'username and password does not match',
			});
		}, 2000);
	});
};
