import { shallowMount } from "@vue/test-utils";
import store from "@/store/index.ts";
import Home from "@/views/Home.vue";
let wrapper: any;
beforeEach(() => {
  wrapper = shallowMount(Home, {
    store
  });
});

describe("HTML render correctly", () => {
  it("article", () => {
    expect(wrapper.contains("article")).toBe(true);
  });
});
describe("computed", () => {
  it("currentData", () => {
    wrapper.vm.currentDataIndex = 0;
    expect(wrapper.vm.currentData).toBe("Morning1");
  });
  it("finishedAmount", () => {
    expect(wrapper.vm.finishedAmount).toBe(2);
  });
});
describe("methods", () => {
  it("killInterval, method should kill interval", () => {
    wrapper.vm.killInterval();
    expect(wrapper.vm.intervalId).toBe(undefined);
  });
  it("handleBtn--1, should clear interval", () => {
    wrapper.vm.points = [1500];
    wrapper.vm.pause = false;
    wrapper.vm.handleBtn();
    expect(wrapper.vm.pause).toBe(true);
    expect(wrapper.vm.intervalId).toBe(undefined);
  });
  it("handleBtn--2, should set interval if pause", () => {
    wrapper.vm.points = [1500];
    wrapper.vm.pause = true;
    wrapper.vm.handleBtn();
    expect(wrapper.vm.pause).toBe(false);
    expect(typeof wrapper.vm.intervalId).toBe("number");
  });
  it("handleOtherTask, should update store's data and current component's data", () => {
    const preInfo = {
      id: 1,
      points: [1400],
      currentDataIndex: 0
    };
    wrapper.vm.points = preInfo.points;
    wrapper.vm.currentDataIndex = preInfo.currentDataIndex;
    wrapper.vm.handleOtherTask(preInfo.id);
    expect(Math.round(store.state.data[0].cost)).toBe(
      Math.round((1500 - preInfo.points[0]) / 60)
    );
    expect(wrapper.vm.currentDataIndex).toBe(
      wrapper.vm.searchIndex(preInfo.id)
    );
  });
  it("interFun, should minus 60", () => {
    const defaultVal = wrapper.vm.points;
    wrapper.vm.interFun();
    expect(wrapper.vm.points).toEqual([defaultVal - 1]);
  });
  it("checkProcess--1, should clear interval in pause status", () => {
    wrapper.vm.intervalId = setInterval(wrapper.vm.interFun, 1000);
    wrapper.vm.points = [1500];
    wrapper.vm.pause = true;
    expect(wrapper.vm.checkProcess()).toBe(true);
    expect(wrapper.vm.pause).toBe(true);
    expect(wrapper.vm.intervalId).toBe(undefined);
  });
  it("checkProcess--2, should update store data and set point to 300", () => {
    wrapper.vm.points = [0];
    store.state.data[wrapper.vm.currentDataIndex].step = 0;
    expect(wrapper.vm.checkProcess()).toBe(false);
    expect(store.state.data[wrapper.vm.currentDataIndex].step).toBe(1);
    expect(wrapper.vm.points).toEqual([300]);
    expect(wrapper.vm.pause).toBe(false);
  });
  it("checkProcess--3, should update store data and set pause to true", () => {
    wrapper.vm.points = [0];
    const defaultIndex = wrapper.vm.currentDataIndex
    store.state.data[defaultIndex].step = 1;
    expect(wrapper.vm.checkProcess()).toBe(false);
    expect(store.state.data[defaultIndex].step).toBe(2);
    expect(wrapper.vm.pause).toBe(true);
  });
  it("searchFinishedIndex, should return 0 because it is the first index of step zero data in store",()=>{
    store.state.data[0].step = 0;
    expect(wrapper.vm.searchFinishedIndex()).toBe(0);
  });
  it("searchIndex, should return 2 if given id is 2", ()=>{
    expect(wrapper.vm.searchIndex(2)).toBe(2);
  });
  it("removeFinished, should find the first step zero data and set it to component data", ()=>{
    wrapper.vm.currentDataIndex = 0
    store.state.data[0].step = 2;
    store.state.data[1].step = 0;
    store.state.data[1].cost = 1
    wrapper.vm.removeFinished()
    expect(wrapper.vm.currentDataIndex).toBe(1)
    expect(wrapper.vm.points).toEqual([1440])
  });
});
