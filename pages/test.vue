<template>
  <v-row>
    <v-col class="text-center">
      <h1>API TEST</h1>
      <div>{{apiCheck}}</div>
      <div>
        <button class="btn btn-primary" @click="api">API GOGO</button>
      </div>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data() {
      return {
        apiCheck: ''
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
    head: {
      title: 'Test',
      meta: [
        {
          hid: 'Test111',
          name: 'Test222',
          content: 'Test333'
        }
      ],
    },
  }
</script>
