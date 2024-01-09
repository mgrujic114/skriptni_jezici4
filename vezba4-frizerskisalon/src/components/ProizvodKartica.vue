<template>
    <div class="proizvod" @click="kliknutProizvod()">
      <div class="slika">
        <img :src="proizvod.slika" alt="">
      </div>

      <h3>{{ proizvod.naziv }}</h3>
      <h4>{{ proizvod.cena.toLocaleString() }} RSD</h4>
    </div>
</template>

<script>
export default {
  name: 'ProizvodKartica',

  props: {
    proizvod: Object
  },

  methods: {
    kliknutProizvod () {
      this.$router.push({ name: 'Proizvod', params: { id: this.proizvod.id } })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@100;200;300;400;500;600;700;800;900&display=swap');
  .proizvod{
    width: 45%;
    margin: 2%;
    padding: 10px;
    border-radius: 40px;
    background-color: #FCFCFC;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    text-align: center;
    font-family: 'Kanit', sans-serif;
    color: #213E51;
  }

  h3{
    font-size: 18px;
    font-weight: 400;
  }

  h4{
    font-size: 15px;
    font-weight: 600;
  }

  .slika{
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    overflow: hidden;
    border-radius: 40px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  img{
    width: 110%;
    /* border-radius: 40px; */
    margin-bottom: -20px;
    margin-top: -70px;
    margin-left: -20px;
  }
</style>