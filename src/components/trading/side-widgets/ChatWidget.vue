<script>

import { mdiSync } from '@mdi/js';
import { useTickerStore } from '../../../stores/tickerStore';
import requester from '@/lib/requester'

export default {
  name: 'ChatWidget',

  data() {
    return {
      isChatLoading: true,
      isCategoryLoading: true,
      categories: {
        results: []
      },
      selectedCategory: {
        id: null,
        title: null
      },
      forums: { // for pagination later
        results: []
      },
      newChat: {
        title: null
      }
    }
  },
  setup() {
    const store = useTickerStore()
    return {
      mdiSync,
      store
    }
  },
  beforeUnmount() {
    clearInterval(this.liveIntervalId)
  },
  mounted() {
    requester(`forum-category/`, {
      method: 'GET'
    }).then(response => {
      this.categories.results = response.data;
      this.isCategoryLoading = false
      // if (data.results && data.results.length > 0) {
      if (response.data && response.data.length > 0) {
        this.isChatLoading = true
        this.handleCatClick(response.data[0])
      }

    }).catch(err => {
      // console.log(err)
      self.isCategoryLoading = false
      this.$notify({
        type: "warning",
        title: err ? err.message : 'Something went wrong'
      })
    })

    // and set interval 
    this.liveIntervalId = setInterval(() => {
      
      if (this.selectedCategory.id){
         // console.log('Getting chat data ... ', this.selectedCategory.title)
        this.getChatData(this.selectedCategory.id)
      }

    }, 15 * 1000)
  },
  methods: {

    getChatData(catId) {
      
      requester(`forums/`, {
        method: 'GET',
        query: {
          category: catId
        }
      })
        .then(response => {
          // data.results = data.results.reverse()
          this.forums.results = response.data //?.reverse()
          this.isChatLoading = false
        }).catch(err => {
          console.log(err)
          self.isChatLoading = false
          this.$notify({
            type: "warning",
            title: err ? err.message : 'Something went wrong'
          })
        })
    },
    handleCatClick(cat) {
      this.selectedCategory = {
        id: cat.id,
        title: cat.title
      }
      this.isChatLoading = true
      this.getChatData(cat.id)
      this.categories.results.forEach(c => {
        c.isActive = c.id == cat.id
      })
    },
    chatSubmitHandler() {
      // console.log(this.newChat.title)
      if (!this.newChat.title || this.newChat.title === "") {
        return
      }
      // console.log(this.selectedCategory, 'on submit form')
      requester(`forums/`, {
        method: 'POST',
        body: JSON.stringify({
          title: this.newChat.title,
          company: this.store.company.id,
          category: this.selectedCategory.id,
          description: null
        })
      }).then(data => {
        // console.log(data)
        this.newChat.title = null
        this.isChatLoading = true
        this.getChatData(this.selectedCategory.id)
      }).catch(err => {
        console.log(err)
        // self.isLoading = false
        this.$notify({
          type: "warning",
          title: err ? err.message : 'Something went wrong'
        })
      })
    }
  }

}
</script>

<template>

  <div class="card hotlist-card mb-0 mr-2">
    <div class="card-header header-elements-inline pt-1 pb-1 bg-brand">
      <h5 class="card-title">
        {{ selectedCategory.title || "Chat" }}
      </h5>
      <div class="header-elements">
        <div v-show="isChatLoading" class="text-white">
          <svg-icon type="mdi" class="spinner" :path="mdiSync"></svg-icon>
        </div>
        <span class="badge badge-icon cursor-pointer text-white" @click="() => store.toggleSideTab('', 'hide')">
          <i class="icon-cross2"></i>
        </span>
      </div>
    </div>
    <div class="table-responsive d-flex-reverse">
      <div class="list-group py-1" style="border: 0;" ref="chatListContainer">

        <div class="list-group-item hstack p-1 border-bottom" v-for="(forum, index) in forums.results" :key="forum.id"
          :ref="`chat-list-${index}`">
          <span class="status-indicator-container p-0">
            <img src="@/assets/img/user-img.png" class="mr-2 rounded-pill" :style="{ height: '40px', width: '40px' }">
          </span>
          <div class="flex-fill">
            <div class="cursor-pointer">
              <span class="text-brand">
                {{ forum.created_by }}
              </span>
              <small class="ml-1 text-muted">
                {{ $dayjs(forum.created_on).fromNow() }}
              </small>

            </div>
            <span class="text-black">
              {{ forum.title }}
            </span>
            <span class="text-muted d-block">
              {{ forum.description }}
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div class="card hotlist-card mb-0 mr-2">
    <FormKit type="form" id="ticker-buy-sell-form" @submit="chatSubmitHandler" :actions="false">
      <FormKit type="text" v-model="newChat.title" name="chat_title" placeholder="New message (Enter to send)" />
    </FormKit>
    <div class="card-header header-elements-inline pt-1 pb-1">
      <h5 class="card-title">
        Topics
      </h5>
      <div class="header-elements">
        <div v-if="isCategoryLoading" class="text-dark">
          <svg-icon type="mdi" class="spinner" :path="mdiSync"></svg-icon>
        </div>
      </div>
    </div>
    <div class="table-responsive">

      <div class="list-group py-1" style="border: 0;">

        <div class="list-group-item hstack p-1 border-bottom" v-for="cat in categories.results" :key="cat.id"
        :class="{
            'active': cat.isActive
          }">
          <div class="flex-fill">
            <div class="font-weight-semibold cursor-pointer" @click="handleCatClick(cat)">
              {{ cat.title }}
            </div>
            <small class="d-block">{{ cat.description }}</small>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>


<style scoped>
.hotlist-card {
  height: 50vh;
}

.hotlist-card>.card-body {
  overflow-y: scroll;
}

.d-flex-reverse {
  display: flex;
  flex-direction: column-reverse;
}
.list-group-item.active {
    z-index: 2;
    color: #fff;
    background-color: #277a34;
    border-color: #277a34;
}
</style>