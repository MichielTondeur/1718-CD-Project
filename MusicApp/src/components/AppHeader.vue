<template>
    <div id="app">
    <v-toolbar color="amber">
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat :to="{path:'/'}">MyMusicApp</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-text-field solo-inverted flat v-model="search" :value="search" label="Search" prepend-icon="search"></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-model="filter" v-on:click="filterValue('no')">
          <v-icon>not_interested</v-icon>
        </v-btn>
        <v-btn flat v-model="filter" v-on:click="filterValue('favorite')">
          <v-icon>star</v-icon>
        </v-btn>
        <v-menu
        transition="slide-y-transition"
        bottom
        >
        <v-btn flat slot="activator">
          <v-icon>list</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="genre in genres" :key="genre.name"  v-on:click="filterValue(genre.name)">
            <v-list-tile-title>{{ genre.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu
        transition="slide-y-transition"
        bottom
        >
      <v-btn flat slot="activator">
        <v-icon>format_list_numbered</v-icon>
      </v-btn>
        <v-list>
          <v-list-tile v-for="score in scores" :key="score.name"  v-on:click="filterValue(score.name)">
            <v-list-tile-title>{{ score.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <router-view :search="search" :filter="filter"/>
</div>

</template>

<script>
export default {
  name: 'artists',
  data () {
    return {
      genres: [
        { name: 'Jazz' },
        { name: 'Rock' },
        { name: 'Indie' },
        { name: 'Folk' },
        { name: 'Punk' }
      ],
      scores: [
        { name: '90-100' },
        { name: '80-90' },
        { name: '70-80' },
        { name: '60-70' },
        { name: '50-60' },
        { name: '40-50' },
        { name: '30-40' },
        { name: '20-30' },
        { name: '10-20' },
        { name: '0-10' },
      ],
      search:'',
      filter: 'no'
    }
  },
  methods: {
    filterValue(value) {
      this.filter = value
    }
  }
}
</script>



