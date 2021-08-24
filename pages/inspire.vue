<template>
  <v-row>
    <v-col class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
      <img src='~/assets/og/aaaa.png'>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    head() {
      return {
        title: 'inspire',
        meta: [
          {
            hid: 'description',
            name: 'inspire222',
            content: 'inspire333'
          },
          { hid: 'og:title', name: 'inspire', content: 'inspire OG' },
          {
            hid: 'og:description',
            property: 'og:description',
            content: 'Inspire'
          },
          {
            hid: 'og:image',
            property: 'og:image',
            content: `${this.$config.baseURL}/og/aaaa.png`
          },
        ],
      }
    },
  }
</script>