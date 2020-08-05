<template>
  <article class="main">
    <section class="main__body--4">
      <main-list @clickBox="handleOtherTask"></main-list>
    </section>
    <section class="main__body--8 text-center">
      <h2 class="color--sub">Start Work Now</h2>
      <h2>{{ currentData }}</h2>
      <div class="content">
        <chart :points="points" :pause="pause" @clickbtn="handleBtn"></chart>
      </div>
      <h2 class="color--sub">Pomodoro Todo</h2>
      <h2 class="color--main">You have finished {{ finishedAmount }} works</h2>
    </section>
  </article>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Chart from "@/components/Chart.vue";
import MainList from "@/components/MainList.vue";

interface DataType {
  id: number;
  name: string;
  detail: string;
  step: number;
  cost: number;
  time: number;
}

@Component({
  components: {
    Chart,
    MainList
  }
})
export default class Home extends Vue {
  intervalId: number | undefined = undefined;
  points = [1500];
  pause = true;
  currentDataIndex = 0;
  get currentData(): string {
    return this.$store.state.data[this.currentDataIndex].name;
  }
  get finishedAmount(): number {
    return this.$store.state.data.filter((val: DataType) => val.step == 2)
      .length;
  }
  killInterval(): void {
    clearInterval(this.intervalId);
    this.intervalId = undefined
  }
  handleBtn(): void {
    if (this.points[0] > 0) {
      if (!this.pause) {
        // 執行中
        this.pause = true;
        this.killInterval();
      } else {
        this.pause = false;
        this.intervalId = setInterval(this.interFun, 1000);
      }
    }
  }
  handleOtherTask( id: number): void{
    const sendData = {
      index: this.currentDataIndex,
      cost: 1500 - this.points[0]
    }
    this.$store.commit("updateTime", sendData);
    const dataIndex = this.searchIndex(id)
    if(dataIndex === undefined) return;
    this.pause = true
    this.killInterval()
    this.currentDataIndex = dataIndex
    this.points = [1500 - this.$store.state.data[dataIndex].cost * 60];
  }
  interFun(): void {
    if (!this.checkProcess()) return;
    this.points = [this.points[0] - 1];
  }
  checkProcess(): boolean {
    if (this.pause) {
      // 暫停
      this.killInterval();
    }
    if (
      this.points[0] <= 0 &&
      !this.$store.state.data[this.currentDataIndex].step
    ) {
      // 跑完
      const sentData = {
        index: this.currentDataIndex,
        step: 1
      };
      this.$store.commit("updateStep", sentData);
      this.points = [300];
      this.pause = false;
      this.killInterval();
      this.intervalId = setInterval(this.interFun, 1000);
      return false;
    }
    if (
      this.points[0] <= 0 &&
      this.$store.state.data[this.currentDataIndex].step == 1
    ) {
      // 結束
      const sentData = {
        index: this.currentDataIndex,
        step: 2
      };
      this.$store.commit("updateStep", sentData);
      this.pause = true;
      this.killInterval();
      this.removeFinished();
      return false;
    }

    return true;
  }
  searchFinishedIndex(): number | undefined {
    for (let i = 0; i < this.$store.state.data.length; i++) {
        if (this.$store.state.data[i].step === 0) {
          return i;
        }
      }
      return undefined;
  }
  searchIndex(id: number): number | undefined {
    for (let i = 0; i < this.$store.state.data.length; i++) {
        if (this.$store.state.data[i].id === id) {
          return i;
        }
      }
      return undefined;
  }
  removeFinished(): void {
    const result = this.searchFinishedIndex();
    if (result !== undefined) {
      this.currentDataIndex = result;
      this.points = [1500 - this.$store.state.data[result].cost * 60];
    } else {
      this.killInterval();
    }
  }
  mounted() {
    this.removeFinished();
  }
  beforeDestroy() {
    const sendData = {
      index: this.currentDataIndex,
      cost: 1500 - this.points[0]
    }
    this.$store.commit("updateTime", sendData);
    this.killInterval();
  }
}
</script>
