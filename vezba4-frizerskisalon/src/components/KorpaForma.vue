<template>
    <div class="forma">
        <h2>Narudžbina</h2>
        <b-container fluid>
        <b-row>
            <b-col>
                <label for="ime_prezime">Ime i Prezime</label>
                <b-form-input id="ime_prezime" v-model="narudzbina.klijent"></b-form-input>
            </b-col>
        </b-row>
        
        <b-row>
            <b-col>
                <label>Broj Telefona</label>
                <b-form-input id="telefon" :state="validanBrojTelefona" v-model="narudzbina.telefon"></b-form-input>
            </b-col>
        </b-row>
      </b-container>
      <div class="dugme">
        <b-button class="posalji" @click="posalji()">Pošalji</b-button>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      narudzbina: {
        klijent: null,
        telefon: null,
        status: 'Novo',
        user_id: this.$store.getters.user_id,
        korpa: this.$store.getters.proizvodiIzKorpe
      }
    }
  },

  computed: {
    validanBrojTelefona () {
      if (this.narudzbina.telefon == null) return null
      else if (this.narudzbina.telefon.length > 6) return true
      else return false
    }
  },

  methods: {
    posalji () {
      if (this.validanBrojTelefona) {
        fetch('http://localhost:9000/termin', {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(this.narudzbina)
        })
          .then(res => res.json())
          .then(res => {
            console.log(res)
            if (res.error) {
              this.statusnaPoruka = res.error
              this.statusnaPorukaTip = 'danger'
            } else {
              this.statusnaPorukaTip = 'success'
            }
          })
      } else {
        console.log('nije se poslalo')
      }
    }
  }

}
</script>

<style>
.forma{
    font-size: 18px;
    font-family: Kanit, sans-serif;
}

.forma h2{
    color:#213E51;
    font-size: 33px;
    margin-left: 10px;
    font-weight: 800;
    font-family: Nunito, sans-serif;
}

.forma label{
    margin-top: 10px;
}

.forma input{
    height: 55%;
    font-size: 18px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.forma input:focus{
    border: 1px solid #213E51;
    box-shadow: none;
}

.dugme{
    text-align: right;
    margin-right: 15px;
    margin-top: 25px;
}

.dugme .posalji{
    background-color: #213E51;
}

.dugme .posalji:hover{
    background-color: #3b5f77;
}

.dugme .posalji:active{
    background-color: #36576c !important;
}

</style>