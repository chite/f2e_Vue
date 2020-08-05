<template>
  <article v-show="id && dataDetail">
    <h1 class="main__title">{{dataDetail.name}}</h1>
    <section class="border">
      <div class="border__body--3">
        <p class="border__text">{{dataDetail.time}}</p>
        <h1 class="border__num color--main border__text">{{dataDetail.cost}}</h1>
        <p class="color--sub border__text">Finsished time</p>
      </div>
      <p class="border__body--9 border__description">
        {{dataDetail.detail}}
      </p>
    </section>
  </article>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface DataType {
  id: number;
  name: string;
  detail: string;
  step: number;
  cost: number;
  time: number;
}

@Component
export default class Detail extends Vue {
  id: number | null = null
  get dataDetail(): DataType | number{
    for(let i =0; i < this.$store.state.data.length; i++){
      if(this.$store.state.data[i].id == this.id){
        return this.$store.state.data[i]
      }
    }
    return 0
  }
  mounted() {
    const search = window.location.search.split("?")[1].split("=");
    for (let i = 0; i < search.length; i++) {
      if (search[i] == "page") {
        this.id = Number(search[i + 1]);
        break;
      }
    }
  }
}
</script>
