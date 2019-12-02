import Api from '@/services/Api'

export default {
  fetchArtists () {
    return Api().get('artists')
  },
  fetchArtist (params) {
    return Api().get('artist/' + params.id)
  },
  updateFavorite (params) {
    return Api().put('/' + params.id, params)
  },
  updateArtist (params) {
    return Api().put('artist/' + params.id, params)
  },
}