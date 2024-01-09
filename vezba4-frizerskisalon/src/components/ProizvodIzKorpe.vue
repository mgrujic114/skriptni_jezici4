<template>
    <div class="proizvodIzKorpe">
      <div class="slika">
        <img :src="proizvod.slika" alt="">
      </div>
      <div class="tekst">
        <h3>{{ proizvod.naziv }}</h3>
        <div class="cenakol">
          <h3 class="kolicina">{{ proizvod.quantity }}x</h3>
          <h3>{{ proizvod.kategorija.koeficijent }}x</h3>
          <h3>{{ cena.toLocaleString() }} RSD</h3>
        </div>
        <span class="close" @click="izbaciIzKorpe()">&times;</span>
      </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ProizvodIzKorpe',

  props: {
    proizvod: Object
  },

  methods: {
    ...mapMutations([
      'removeIzKorpe'
    ]),
    izbaciIzKorpe () {
      this.removeIzKorpe(this.proizvod)
    }
  },

  computed: {
    cena () {
      return this.proizvod.cena * this.proizvod.quantity 
    }
  }

}
</script>

<style scoped>
  .proizvodIzKorpe{
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .slika{
    width: 150px;
    height: 112px;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    display: inline-block;
  }

  img{
    width: 110%;
    margin-top: -12px;
    margin-left: -3px;
  }

  .tekst{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;
    width: 75%;
    margin-top: 10px;
    position: relative;
  }

  h3{
    font-size: 18px;
  }

  .kolicina{
    color: #656565;
  }

  .cenakol{
    display: flex;
    justify-content: space-between;
    vertical-align: bottom;
  }

  .close {
    position: absolute;
    font-size: 40px;
    font-weight: 300;
    background-color: white;
    top: 0px;
    left: 96%;
    cursor: pointer;
    line-height: 0%;
  }
</style>