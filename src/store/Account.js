import config from './Config';

const instance = config.axiosInstance;

const AccountApi = {
	update: (id, name) => {
		return instance.put('account/' + id, {
      name: name
    });
	}
}

export default AccountApi