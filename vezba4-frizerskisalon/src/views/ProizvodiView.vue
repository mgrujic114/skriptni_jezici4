<template>
    <div>
      <b-container class="bv-example-row">
      <b-row>
        <b-col cols="10">
          <div class="proizvodi">
            <ProizvodKartica v-for="proizvod in currentPageItems" :key="proizvod.id" :proizvod="proizvod" />
          </div>
          <div class="dugmici">
            <button @click="prev(), scrollToTop()">&lt;</button>
            <button @click="next(), scrollToTop()">&gt;</button>
          </div>
        </b-col>
      </b-row>
    </b-container>
    </div>
</template>

<script>
import ProizvodKartica from '@/components/ProizvodKartica.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ProizvodiView',
  components: {
    ProizvodKartica
  },
  data () {
    return {
      perPage: 10,
      pageNumber: 0,
      selectedCategory: [],
      selectedMaterial: []
    }
  },
  computed: {
    ...mapState([
      'proizvodi'
    ]),
    filteredCategory () {
      if (!this.selectedCategory.length) {
        return this.proizvodi
      } else {
        return this.proizvodi.filter(p =>
          this.selectedCategory.includes(p.kategorija_id.toString())
        )
      }
    },
    filteredProducts () {
      if (!this.selectedMaterial.length) {
        return this.filteredCategory
      } else {
        console.log(this.selectedMaterial)
        console.log(this.filteredCategory)
        return this.filteredCategory.filter(p =>
          this.selectedMaterial.includes(p.materijal[0].materijal_id.toString())
        )
      }
    },
    currentPageItems () {
      return this.filteredProducts.slice(this.pageNumber * this.perPage, this.pageNumber * this.perPage + this.perPage)
    }
  },
  methods: {
    ...mapActions([
      'fetchProizvodi'
    ]),
    next () {
      if (this.pageNumber * 10 < this.proizvodi.length) {
        this.pageNumber++
      }
    },
    prev () {
      if (this.pageNumber > 0) {
        this.pageNumber--
      }
    }
  },
  mounted () {
    this.fetchProizvodi()
  }
}
</script>

<style scoped>
  .proizvodi{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .dugmici{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20, 20, 20, 20;
  }

</style>