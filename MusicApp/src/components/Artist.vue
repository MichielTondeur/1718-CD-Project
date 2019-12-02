<template>
    <div v-if="name != ''" class="table-wrap">
        <v-layout row>
        <v-flex xs12 sm12 xl12 id="mainflex">
        <v-container
          fluid
          style="min-height: 0;"
          grid-list-lg
        >
          <v-layout row wrap>
            <v-flex xs8 offset-xs2>
              <v-card color="darken-2">
                <v-container fluid grid-list-lg id="maincontainer">
                  <v-layout row>
                    <v-flex xs4 >
                      <v-card-media
                        :src="getArtistUrl(profilePicture)"
                        height="250px"
                      >
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
                    </v-flex>
                    <v-flex xs8 fill-height id="center">
                      <div>
                        <div class="display-2">{{name}}</div>
                        <div>{{description}}</div>
                        <div class="amber--text display-1" id="score">{{score}}/100</div>
                        <v-dialog v-model="dialog" persistent max-width="500px">
                            <v-btn color="amber" slot="activator">Edit</v-btn>
                            <v-card>
                            <v-card-title>
                                <span class="headline">Edit {{name}}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                    <v-text-field color="amber" v-model="description" label="Description" :value="description" multi-line required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                    <v-text-field color="amber" v-model="score" label="Score" :value="score" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                </v-container>
                                <small>*indicates required field</small>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="amber darken-1" flat @click.native="dialog = false">Close</v-btn>
                                <v-btn color="amber darken-1" flat v-on:click="updateArtist(id, description ,score)" @click.native="dialog = false">Save</v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-dialog>
                      </div>
                    </v-flex>
                    
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
            <v-flex xs8 offset-xs2>
                <v-layout row wrap>
            <v-flex sm6 md4 id="mainflex" v-for="album in albums" :key="album._id">
                    <v-card raised id="albumcard">
                    <v-card-media
                        :src="getAlbumUrl(album.albumPicture)"
                        height="300px"
                        contain
                    >
                    </v-card-media>
                    <v-card-title primary-title>
                        <div id="center">
                            <span class="headline">{{album.name}}</span>
                            <span class="grey--text headline">{{album.released}}</span>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-expansion-panel focusable>
                            <v-expansion-panel-content ripple>
                                <div slot="header"></div>
                                <v-card v-for="(song, index) in album.songs" :key="song._id">
                                    <v-card-text  :class="{'': index % 2 === 0, 'grey lighten-3': index % 2 !== 0 }">
                                    <p>{{index + 1}}:  {{song}}</p>
                                </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-card-actions>
                    </v-card>
                </v-flex>
                </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
        </v-flex>
        </v-layout>
      </div>
      <div v-else>
      <v-layout row>
        <v-flex xs12 sm12 xl12 id="mainflex">
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
                        <div class="headline">No artist found with this id!</div>
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
  name: 'artist',
  data () {
    return {
        id: "",
        name: "",
        description: "",
        genres: [],
        profilePicture: "",
        isFavorite: false,
        score: 0,
        albums: [],
        show: false,
        dialog: false        
    }
  },
  mounted () {
    this.fetchArtist()
  },
  methods: {
    async fetchArtist () {
      const response = await ArtistService.fetchArtist({
        id: this.$route.params.id
      })
      this.id = response.data.id
      this.name = response.data.name
      this.description = response.data.description
      this.genres = response.data.genres
      this.profilePicture = response.data.profilePicture
      this.isFavorite = response.data.isFavorite
      this.score = response.data.score
      this.albums = response.data.albums

    },
    async updateArtist (id, desc, score) {
      await ArtistService.updateArtist({
        id: id,
        description: desc,
        score: score
      })
      this.$router.push({ path: '/artist/' +id})
    },
     getArtistUrl (img) {
      return require('../assets/artists/' + img)
    },
    getAlbumUrl (img) {
      return require('../assets/albums/' + img)
    },
    getFavorite (bool) {
      return bool
    }
  }
}
</script>

<style scoped>
#mainflex {
  margin-top: 50px;
}

#maincontainer {
    border-top: 6px solid #FFC107;
}

#center {
    margin: auto
}

#score {
    padding-top: 20px;
}

span {
    display: block;
}


</style>

