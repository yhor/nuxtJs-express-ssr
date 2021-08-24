<template>
  <div>
    <h1>{{ mid }} Detail</h1>
    <p> srl : {{srl}} </p>
    <!-- <button @click="$asyncData">Refresh</button> -->
  </div>
</template>

<script> 
  export default {
    // asyncData({params, query}) {
    //   debugger;
    //   console.log('asyncData', this.$config);
    //   // return { ...params }
    // },
    data() {
      return {
        mid: '1',
        srl: null
      }
    },

    //   console.log(this);
    //   debugger;
    async fetch() {
    // async fetch({ params, query }) {
      console.log('params', this.$route);
      // console.log('params', params);
      // console.log('query', query);
      // console.log('this.mid', this.mid);
      // console.log('this', this.params);
      // this.mid = params.mid;
      // this.srl = params.srl;
      // con/sole.log('fetch');
      // this.srl = 'q변경'
    },
    
  } 
</script>
