import config from './Config';

const instance = config.axiosInstance;

const ClosetApi = {  
	all: (q) => {
		return instance.get('closets', {
      params: {
        searchKeywords: q
      }
    });
	},
  delete: (closetId) => {
    return instance.delete('closets/' + closetId)
  },
  get: (closetId) => {
    return instance.get('closets/' + closetId);
  },
  update: (id, name, description) => {
    return instance.put('closets/' + id, {
      name: name,
      description: description
    })
  },
  create: (name, description) => {
    return instance.post('closets', {
      name: name,
      description: description
    })
  }
}

export default ClosetApi