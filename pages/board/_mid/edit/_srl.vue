<template>
  <div>
    <h1>Edit</h1>
    <p> srl : {{srl}} </p>
  </div>
</template>

<script> 
  export default { 
    asyncData({params}) { 
      console.log( params );
      return { 
        srl: params.srl
      };
    },
  } 
</script>
