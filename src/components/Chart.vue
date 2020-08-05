<template>
  <div class="chartElem">
    <div class="row">
      <highcharts
        :options="chartOptions"
        :updateArgs="updateArgs"
        class="chart"
      ></highcharts>
      <div class="btn" @click="handleClick">
        <div class="btn__topCircle"></div>
        <font-awesome-icon :icon="['far', btnState]"></font-awesome-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
interface ThisType {
  align: string;
  verticalAlign: string;
  borderWidth: number;
  useHTML: boolean;
  y: number;
}
@Component
export default class Chart extends Vue {
  @Prop() points!: Array<number>;
  @Prop() title!: string;
  @Prop() units!: number;
  @Prop() min!: number;
  @Prop() max!: number;
  @Prop() pause!: boolean;
  updateArgs = [true, true, { duration: 0 }];
  chartOptions = {
    chart: {
      type: "solidgauge",
      backgroundColor: "#303237"
    },
    exporting: {
      enabled: false
    },
    title: {
      text: ""
    },
    pane: {
      center: ["50%", "50%"],
      startAngle: -160,
      endAngle: 160,
      size: "100%",
      background: {
        backgroundColor: "#000",
        borderWidth: "8",
        borderColor: "#000",
        innerRadius: "97.98%",
        outerRadius: "98.05%",
        shape: "arc"
      }
    },
    yAxis: {
      stops: [[0, "#FEEBB3"]],
      min: 0,
      max: 1500,
      labels: {
        enabled: false
      },
      lineWidth: 0,
      minorTickInterval: null,
      tickWidth: 0
    },
    plotOptions: {
      solidgauge: {
        innerRadius: "95%",
        rounded: true,
        stickyTracking: false
      }
    },
    tooltip: {
      enabled: false
    },
    series: [
      {
        name: "Time",
        data: [1500],
        dataLabels: {
          formatter: function(): string {
            return (
              '<div style="text-align:center"><span style="font-size:4rem;color: #B3B3B9">' +
              Math.floor(this.y / 60).toString() +
              ":" +
              ("0" + (this.y % 60)).slice(-2) +
              "</span><div>"
            );
          },
          align: "center",
          verticalAlign: "middle",
          borderWidth: 0,
          useHTML: true,
          y: 0
        }
      }
    ]
  };
  get btnState() {
    if (this.pause) {
      return "play-circle";
    } else {
      return "pause-circle";
    }
  }
  handleClick(): void {
    this.$emit("clickbtn");
  }
  @Watch("title")
  titleHandler(newValue: string) {
    this.chartOptions.title.text = newValue;
  }
  @Watch("points")
  pointsHandler(newValue: Array<number>) {
    this.chartOptions.series[0].data = newValue;
  }
  @Watch("min")
  minHandler(newValue: number) {
    this.chartOptions.yAxis.min = newValue;
  }
  @Watch("max")
  maxHandler(newValue: number) {
    this.chartOptions.yAxis.max = newValue;
  }
  mounted(): void {
    if (typeof this.title !== "undefined") {
      this.chartOptions.title.text = this.title;
    }
    if (typeof this.min !== "undefined") {
      this.chartOptions.yAxis.min = this.min;
    }
    if (typeof this.max !== "undefined") {
      this.chartOptions.yAxis.max = this.max;
    }
    // 初始化數值
    this.chartOptions.series[0].data = this.points;
     // eslint-disable-next-line
    document
      .querySelector(".highcharts-root path")!
      .setAttributeNS(null, "stroke-linejoin", "round");
  }
}
</script>

<style scoped></style>
