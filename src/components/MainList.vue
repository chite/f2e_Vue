<template>
  <div class="part">
    <nav class="part__top">
      <p class="part__title">Your finished lists</p>
      <p class="part__title part__title--s">
        <router-link to="/list/finished">more</router-link>
      </p>
    </nav>
    <div class="c-box">
      <div
        class="box"
        v-for="value in fininshedList.slice(0, 2)"
        :key="value.id"
      >
        <div class="box__section">
          <h2 class="box__num color--main">{{ value.cost }}</h2>
          <p class="box__num box__num--s color--sub">minute</p>
        </div>
        <div class="box__section">
          <h2 class="box__title">{{ value.name }}</h2>
          <p class="box__title box__title--s">{{ value.detail }}</p>
        </div>
        <div class="box__click">
          <router-link :to="'/detail?page=' + value.id">...</router-link>
        </div>
      </div>
    </div>

    <nav class="part__top">
      <p class="part__title">Your unfinished lists</p>
      <p class="part__title part__title--s">
        <router-link to="/list/unfinished">more</router-link>
      </p>
    </nav>
    <div class="c-box">
      <div
        class="box box--active"
        v-for="value in unfininshedList.slice(0, 2)"
        :key="value.id"
        @click="handleClickBox($event, value.id)"
      >
        <div class="box__section">
          <h2 class="box__num color--main">{{ value.cost }}</h2>
          <p class="box__num box__num--s color--sub">minute</p>
        </div>
        <div class="box__section">
          <h2 class="box__title">{{ value.name }}</h2>
          <p class="box__title box__title--s">{{ value.detail }}</p>
        </div>
        <div class="box__click">...</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface DataType {
  id: number;
  name: string;
  detail: string;
  step: number;
  cost: number;
}

@Component
export default class MainList extends Vue {
  get fininshedList() {
    return this.$store.state.data.filter((val: DataType) => val.step == 2);
  }
  get unfininshedList() {
    return this.$store.state.data.filter((val: DataType) => val.step != 2);
  }
  handleClickBox(e: Event, id: number): void {
    this.$emit("clickBox", id);
  }
}
</script>
