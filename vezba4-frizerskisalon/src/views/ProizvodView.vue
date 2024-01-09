<template>
    <div class="proizvod">
      <b-container class="bv-example-row">
        <b-row>
          <b-col cols="6" class="slika">
            <img :src="proizvod.slika" alt="">
          </b-col>
          <b-col cols="6" class="opis">
            <h3>{{ proizvod.naziv }}</h3>
            <hr>
            <h5>Kategorija: {{  proizvod.kategorija.naziv }}</h5>
            <p>{{ proizvod.opis }}</p>
            <div class="wrapper">
              <div class="quantityWrapper">
                <div class="quantity">
                  <h5>Kolicina</h5>
                  <b-input-group>
                    <b-btn variant="info" @click="decrement()" class="minus">-</b-btn>
                    <b-form-input type="number" min="0.00" :value="quantity" class="broj" disabled></b-form-input>
                    <b-btn variant="info" @click="increment()" class="plus">+</b-btn>
                  </b-input-group>
                </div>
                <div class="uKorpiWrapper">
                  <div class="dodajDugme">
                    <button @click="dodajUKorpu()" class="korpaDugme">Dodaj u Korpu</button>
                  </div>
                  <div class="uKorpi" v-if="ukupnaKolicina">
                    <div class="korpaStavke">
                      <div class="h6Div">
                        <h6>U korpi: {{ ukupnaKolicina }}</h6>
                      </div>
                      <button @click="izbaciIzKorpe()" class="izbaciDugme">X</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cena">
                <h4>{{ proizvod.cena.toLocaleString() }} RSD</h4>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
</template>

<script scoped>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'ProizvodView',

  components: {

  },

  data () {
    return {
      proizvod: null,
      quantity: 1
    }
  },

  methods: {
    ...mapActions([
      'getProizvod'
    ]),
    ...mapMutations([
      'addUKorpu',
      'removeIzKorpe'
    ]),
    increment () {
      this.quantity++
    },
    decrement () {
      if (this.quantity !== 1) {
        this.quantity--
      }
    },
    dodajUKorpu () {
      this.addUKorpu({ proizvod: this.proizvod, kolicina: this.quantity })
    },
    izbaciIzKorpe () {
      this.removeIzKorpe(this.proizvod)
    }
  },

  computed: {
    ukupnaKolicina () {
      return this.$store.getters.kolicinaProizvoda(this.proizvod)
    }
  },

  mounted () {
    console.log(this.$route.params.id)
    this.getProizvod(this.$route.params.id)
      .then(res => {
        console.log(res)
        this.proizvod = res
      })
    console.log(this.proizvod)
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@100;200;300;400;500;600;700;800;900&display=swap');
  .proizvod{
    margin: 40px;
    padding: 30px;
    padding-top: 50px;
    padding-bottom: 50px;
    background-color: white;
    border-radius: 40px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    font-family: 'Kanit', sans-serif;
    color: #213E51;
  }
  .slika{
    text-align: center;
    width: 50%;
  }

  img{
    width: 50%;
    border-radius: 40px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    transition: all .8s ease;
   -webkit-transition: all .8s ease;
  }

  img:hover{
    transform: scale(1.03);
    transition: all .8s ease;
   -webkit-transition: all .8s ease;
  }

  .opis{
    margin-top: auto;
    margin-bottom: auto;
  }

  .proizvod h3{
    font-size: 37px;
    margin-bottom: -5px;
  }
  .proizvod h5{
    margin-top: 10px;
    font-size: 23px;
    color: #656565;
  }

  .proizvod p{
    font-size: 19px;
    color: #656565;
    font-weight: 400;
  }

  .proizvod h4{
    font-size: 40px;
  }

  .wrapper{
    display: flex;
    justify-content: space-between;
  }

  .quantityWrapper{
    width: 60%;
  }

  .quantity{
    max-width: 150px;
    width: 60%;
    margin-bottom: 12px;
  }

  .quantity button{
    background-color: #efefef;
    border: none;
  }

  .quantity button:active{
    background-color: #213E51;
    color: #E9E7E8
  }

  .quantity input {
    text-align: center;
    background-color: #efefef;
    border: 0;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .uKorpi{
    display: inline-block;
    vertical-align: middle;
  }

  .dodajDugme{
    display: inline-block;
    vertical-align: middle;
    align-items: center;
    max-width: 150px;
    width: 80%;
    text-align: center;
  }

  .korpaStavke{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #section1 {
    height: 90%;
    text-align:center;
    display:table;
    width:100%;
  }

  .h6Div{
    text-align:center;
    display:table;
    margin-left: 10px;
  }

  h6 {
    display:table-cell;
    vertical-align:middle;
  }
  .korpaDugme{
    background-color: #3b5f77;
    color: white;
    border-radius: 20px;
    border: 0;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 18px;
  }

  .korpaDugme:hover{
    background-color: #213E51;
  }
  .izbaciDugme{
    background-color: #3b5f77;
    color: white;
    border-radius: 20px;
    border: 0;
    margin-left: 10px;
  }

</style>