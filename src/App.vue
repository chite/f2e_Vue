<template>
  <div class="layout">
    <nav class="nav">
      <span @click="clickIcon('barOpen', $data)" class="nav__box">
        <font-awesome-icon icon="bars"></font-awesome-icon>
        <div :class="[barOpen ? 'nav__content--line' : '', 'nav__content']">
          <p><router-link to="/">Start Page</router-link></p>
          <p><router-link to="/list">Finished List</router-link></p>
        </div>
      </span>
      <span @click="clickIcon('plusOpen', $data)" class="nav__box">
        <font-awesome-icon icon="plus"></font-awesome-icon>
        <div
          :class="[plusOpen ? 'nav__content--box' : '', 'nav__content']"
          @click.stop
        >
          <div class="nav__content--8">
            <p>title</p>
            <input
              class="nav__input"
              v-model="newData.title"
              @change.stop="inputData($event, 'input')"
            />
            <p>Detail</p>
            <textarea
              class="nav__area"
              v-model="newData.content"
              @change.stop="inputData($event, 'textarea')"
            ></textarea>
          </div>
          <div class="nav__content--4 nav__u">
            <button class="nav__btn" @click.stop="send($event, $store, $data)">
              Send
            </button>
          </div>
        </div>
      </span>
    </nav>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  private barOpen = false
  private plusOpen = false
  private newData = {
    title: '',
    content: '',
  }
  // eslint-disable-next-line
  clickIcon(name: string, data: any): void {
    data[name] = !data[name]
  }
  inputData(e: { target: HTMLInputElement }, data: string): void {
    if (data == 'input') {
      this.newData.title = e.target.value
    } else {
      this.newData.content = e.target.value
    }
  }
  // eslint-disable-next-line
  send($event: Event, store: any, data: any): void {
    const sendData = {
      ...data.newData,
      step: 0,
      cost: 25,
      id: store.state.data[store.state.data.length - 1].id + 1,
      time: new Date().toLocaleDateString()
    }
    store.commit('setName', sendData)

    data.newData = {
      title: '',
      content: '',
    }
    data.plusOpen = false
  }
}
</script>
