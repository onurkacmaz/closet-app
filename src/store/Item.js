import config from './Config';

var instance = config.axiosInstance

const ItemApi = {
  delete: (itemId) => {
    return instance.delete('items/' + itemId)
  },
  get: (itemId) => {
    return instance.get('items/' + itemId);
  },
  create: (closetId, name, note, photos) => {
    return instance.post('items', {
      closetId: closetId,
      name: name,
      note: note,
      photos: photos
    })
  },
  update: (itemId, name, note, photos) => {
    return instance.put('items/' + itemId, {
      name: name,
      note: note,
      photos: photos
    })
  }
}

export default ItemApi