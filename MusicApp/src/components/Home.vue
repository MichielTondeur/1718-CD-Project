<template>
    <div v-if="filteredArtists.length > 0" class="table-wrap">
          <v-layout row>
          <v-flex xs12 sm12 xl6 offset-xl3 id="mainflex">
          <v-container grid-list-xl>
            <v-layout row wrap>
              <v-flex d-flex xs12 sm6 md4 lg4 xl4 v-for="artist in filteredArtists" :key="artist._id">
            <v-card raised>
              <v-card-media
                height="300px"
                :src="getArtistUrl(artist.profilePicture)"
              >
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-title primary-title>
                <div id="center">
                  <span class="display-1">{{artist.name}}</span><br>
                  <span class="grey--text display-1"> {{artist.score}}/100 </span><br>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat color="orange" :to="{path:createPath(artist.id)}">Explore</v-btn>
                <v-spacer></v-spacer>
                <div v-if=getFavorite(artist.isFavorite)>
                  <v-btn v-on:click="toggleFavorite(artist.id, false)" flat icon color="orange">
                    <v-icon>star</v-icon>
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn v-on:click="toggleFavorite(artist.id, true)" flat icon color="orange">
                    <v-icon>star_border</v-icon>
                  </v-btn>
                </div>

              </v-card-actions>
            </v-card>
              </v-flex>
          </v-layout>

            </v-container>
          </v-flex>
          </v-layout>

      </div>
      <div v-else>
      <v-layout row>
        <v-flex xs12 sm12 lg6 offset-lg3 id="mainflex">
        <v-container
          fluid
          style="min-height: 0;"
          grid-list-lg
        >
          <v-layout row wrap>
            <v-flex xs12>
              <v-card color="darken-2">
                <v-container fluid grid-list-lg id="maincontainer">
                  <v-layout row>
                    <v-flex xs12 fill-height>
                      <div id="center">
                        <div class="headline">No artists found</div>
                      </div>
                    </v-flex>
                    
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        </v-flex>
      </v-layout>
    </div>
</template>

<script>
import ArtistService from '@/services/ArtistsService'

export default {
  name: 'artists',
  data () {
    return {
      artists: [],
      filterArtists: [],
      isFavorite: true
    }
  },
  mounted () {
    this.getArtists()
  },
  props: {
    search: {
      type: String,
      required: false
    },
    filter: {
      type: String,
      required: false
    }
  },
  methods: {
    async getArtists () {
      const response = await ArtistService.fetchArtists()
      this.artists = response.data.artists
      this.filterArtists = response.data.artists
    },
    async toggleFavorite (id, bool) {
      await ArtistService.updateFavorite({
        id: id,
        isFavorite: bool,
      })
      this.$router.replace({ path: '/' })
    },
     getArtistUrl (img) {
      return require('../assets/artists/' + img)
    },
    getAlbumUrl (img) {
      return require('../assets/albums/' + img)
    },
    getFavorite (bool) {
      return bool
    },
    createPath(id) {
      return '/artist/' + id
    },
    Filter() {
      if (this.filter === 'no') {
        this.filterArtists = this.artists
      }
      else if (this.filter === 'favorite') {
        this.filterArtists = this.artists.filter(function (p) {return p.isFavorite == true })
      }
      else if (this.filter === 'Jazz') {
        this.filterArtists = this.artists.filter(function (p) {return p.genres.includes('Jazz') == true })
      }
      else if (this.filter === 'Rock') {
        this.filterArtists = this.artists.filter(function (p) {return p.genres.includes('Rock') == true })
      }
      else if (this.filter === 'Indie') {
        this.filterArtists = this.artists.filter(function (p) {return p.genres.includes('Indie') == true })
      }
      else if (this.filter === 'Folk') {
        this.filterArtists = this.artists.filter(function (p) {return p.genres.includes('Folk') == true })
      }
      else if (this.filter === 'Punk') {
        this.filterArtists = this.artists.filter(function (p) {return p.genres.includes('Punk') == true })
      }      
      else if (this.filter === '90-100') {
        this.filterArtists = this.artists.filter(function (p) {return (p.score >= 90) == true })
      }
      else if (this.filter === '80-90') {
        this.filterArtists = this.artists.filter(function (p) {return (p.score >= 80 && p.score < 90) == true })
      }
      else if (this.filter === '70-80') {
        this.filterArtists = this.artists.filter(function (p) {return (p.score >= 70 && p.score < 80) == true })
      }
      else if (this.filter === '60-70') {
        this.filterArtists = this.artists.filter(function (p) {return (p.score >= 60 && p.score < 70) == true })
      }
      else if (this.filter === '50-60') {
        this.filterArtists = this.artists.filter(function (p) {return (p.score >= 50 && p.score < 60) == true })
      }
      else if (this.filter === '40-50') {
        this.filterArtists = this.artists.filter(function (p) {return (p.score >= 40 && p.score < 50) == true })
      }
      else if (this.filter === '30-40') {
        this.filterArtists = this.artists.filter(function (p) {return (p.score >= 30 && p.score < 40) == true })
      }
      else if (this.filter === '20-30') {
        this.filterArtists = this.artists.filter(function (p) {return (p.score >= 20 && p.score < 30) == true })
      }
      else if (this.filter === '10-20') {
        this.filterArtists = this.artists.filter(function (p) {return (p.score >= 10 && p.score < 20) == true })
      }
      else if (this.filter === '0-10') {
        this.filterArtists = this.artists.filter(function (p) {return (p.score < 10) == true })
      }
      else {  
        this.filterArtists = this.artists
      }
    }
  },
  computed: {
    filteredArtists() {
      this.Filter()
      return this.filterArtists.filter((artist) => {
        return artist.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>

<style>
#mainflex {
  margin-top: 50px;
}

#maincontainer {
    border-top: 6px solid #FFC107;
}

#center {
  margin: auto;
}
</style>