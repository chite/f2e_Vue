<template>
  <article>
    <h1 class="main__title">Your {{category}} list</h1>
    <section class="main s-main main__part main__part--two">
      <div
        class="box"
        v-for="value in finishedList.slice(0, amount)"
        :key="value.id"
      >
        <div class="box__section">
          <h2 class="box__num color--main">{{ value.cost }}</h2>
          <p class="box__num box__num--s color--sub">minute</p>
        </div>
        <div class="box__section">
          <h2 class="box__title">{{ value.name }}</h2>
          <p class="box__title box__title--s">
            {{ value.detail }}
          </p>
        </div>
        <div class="box__click">
          <router-link :to="'/detail?page=' + value.id">...</router-link>
        </div>
      </div>
    </section>
    <p
      class="main__addition text-center"
      v-show="amount < finishedList.length"
      @click="getMore($event, $data)"
    >
      more
    </p>
  </article>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from 'vue-router';

interface DataType {
  id: number;
  name: string;
  detail: string;
  step: number;
  cost: number;
  time: number;
}

@Component
export default class List extends Vue {
  private amount = 4;
  private category = "";
  private that =this;
  get finishedList() {
    if (this.$data.category == "finished") {
      return this.$store.state.data.filter((val: DataType) => val.step == 2);
    } else if (this.$data.category == "unfinished") {
      return this.$store.state.data.filter((val: DataType) => val.step != 2);
    } else {
      return [];
    }
  }
  getMore(e: Event, data: { amount: number }) {
    data.amount += 4;
  }
  mounted() {
    this.$data.category = this.$route.params.category;
  }
  @Watch("$route")
  routeHandler(newProperty: Route) {
    this.$data.category = newProperty.params.category;
  }
}
</script>
