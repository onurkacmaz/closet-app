import config from './Config';

const instance = config.axiosInstance;

const CombineApi = {  
	all: () => {
		return instance.get('combines');
	},
  delete: (id) => {
    return instance.delete('combines/' + id)
  },
  get: (id) => {
    return instance.get('combines/' + id);
  }
}

export default CombineApi