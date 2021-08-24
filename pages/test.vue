<template>
  <v-row>
    <v-col class="text-center">
      <h1>API TEST</h1>
      <div>{{apiCheck}}</div>
      <div>
        <button class="btn btn-primary" @click="api">API GOGO</button>
      </div>
      <img src='~/assets/og/tmdd.png'>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data() {
      return {
        title: '테스트',
        apiCheck: '',
        NODE_ENV: ''
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {
            hid: 'description',
            name: 'Test222',
            content: 'Test333'
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: this.title
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: '테스트 상세페이지이다'
          },
          {
            hid: 'og:image',
            property: 'og:image',
            content: `${this.$config.baseURL}/og/tmdd.png`
          },
        ],
      }
    },
    methods: {
      async api() {
        console.debug('call Api');
        try {
          const response = await this.$axios.post('/api/');
          console.debug('response - ', response);
          this.apiCheck = response;
        } catch (error) {
          console.debug('error - ', error);
          this.apiCheck = error;
        }
      }
    },
  }
</script>
