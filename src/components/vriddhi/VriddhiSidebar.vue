<script>
import { mdiViewDashboard, mdiBullseyeArrow } from '@mdi/js'

export default {
  name: 'PlannerList',
  setup: function () {
    return { mdiViewDashboard, mdiBullseyeArrow }
  }
}
</script>

<template>
  <div class="sidebar sidebar-light sidebar-main sidebar-expand-md" style="min-height: 100vh">

    <div class="sidebar-mobile-toggler text-center">
      <a href="#" class="sidebar-mobile-main-toggle">
        <i class="icon-arrow-left8"></i>
      </a>
      Navigation
      <a href="#" class="sidebar-mobile-expand">
        <i class="icon-screen-full"></i>
        <i class="icon-screen-normal"></i>
      </a>
    </div>

    <div class="sidebar-content">

      <div class="sidebar-user-material">
        <div class="sidebar-user-material-body">
          <div class="card-body text-center">
            <img src="@/assets/logo.jpg" class="img-fluid" alt="logo">
          </div>
        </div>
      </div>

      <div class="card card-sidebar-mobile">
        <ul class="nav nav-sidebar" data-nav-type="accordion">
          <li class="nav-item">
            <router-link to="/vriddhi" class="nav-link" exact-active-class="active">
              <i class="mr-2">
                <svg-icon type="mdi" :path="mdiViewDashboard" :size="18"></svg-icon>
              </i>
              <span>Dashboard</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/vriddhi/goal-planner" class="nav-link" exact-active-class="active">
              <i class="mr-2">
                <svg-icon type="mdi" :path="mdiBullseyeArrow" :size="18"></svg-icon>
              </i>
              <span>Goal Planner</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
