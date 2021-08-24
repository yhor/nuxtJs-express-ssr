<template>
  <div>
    <h1>게시판 : {{mid}} </h1>
    <v-btn
      color="primary"
      nuxt
      :to="`${mid}/write`"
    >추가
    </v-btn>
  </div>
</template>

<script> 
  export default { 
    asyncData({params}) { 
      console.log( params );
      return { mid: params.mid };
    }
  } 
</script>
