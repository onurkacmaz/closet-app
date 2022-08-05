import config from './Config';

const instance = config.axiosInstance;

const AccountApi = {
	update: (id, name) => {
		return instance.put('account/' + id, {
      name: name
    });
	},
	updateProfilePicture: (id, photo) => {
		return instance.put('update-profile-picture/' + id, {
      photo: photo
    });
	}
}

export default AccountApi