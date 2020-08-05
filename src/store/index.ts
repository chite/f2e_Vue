import Vue from "vue";
import Vuex from "vuex";
import { VuexModule, Module, Mutation } from "vuex-module-decorators";

Vue.use(Vuex);

interface DataType {
  id: number;
  name: string;
  detail: string;
  step: number;
  cost: number;
  time: string;
}

interface UpdateDataType {
  index: number;
  step: number;
}

interface UpdateDataType2 {
  index: number;
  cost: number;
}

@Module
class User extends VuexModule {
  public data: Array<DataType> = [
    {
      id: 0,
      name: "Morning1",
      detail:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      step: 0,
      cost: 0,
      time: "2020/6/9"
    },
    {
      id: 1,
      name: "Morning2",
      detail:
        "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      step: 2,
      cost: 25,
      time: "2020/6/8"
    },
    {
      id: 2,
      name: "Morning3",
      detail:
        "psum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      step: 2,
      cost: 25,
      time: "2020/5/27"
    },
    {
      id: 3,
      name: "Morning4",
      detail:
        "Lorem adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      step: 0,
      cost: 0,
      time: "2020/6/4"
    },
    {
      id: 4,
      name: "Morning6",
      detail:
        "Aonsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      step: 0,
      cost: 0,
      time: "2020/6/5"
    },
    {
      id: 5,
      name: "Morning4",
      detail:
        "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      step: 0,
      cost: 0,
      time: "2020/6/6"
    }
  ];
  @Mutation
  public setName(newData: DataType): void {
    this.data = [...this.data, newData];
    // console.log(this.data);
  }
  @Mutation
  public updateStep(payload: UpdateDataType): void {
    this.data[payload.index].step = payload.step;
    if (payload.step == 2) this.data[payload.index].cost = 25;
    // console.log(this.data);
  }
  @Mutation
  public updateTime(payload: UpdateDataType2): void {
    this.data[payload.index].cost = Number((payload.cost / 60).toFixed(2));
    // console.log(this.data);
  }
}

export default new Vuex.Store(User);
