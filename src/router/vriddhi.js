import VriddhiLayout from '@/views/VriddhiLayout'
import PlannerLayout from '@/views/PlannerLayout'
import PlannerList from '@/components/vriddhi/PlannerList'
import DreamCar from '@/components/vriddhi/DreamCar'
import DreamCarResult from '@/components/vriddhi/DreamCarResult'
import DreamHouse from '@/components/vriddhi/DreamHouse'
import DreamHouseResult from '@/components/vriddhi/DreamHouseResult'
import VacationPlanning from '@/components/vriddhi/VacationPlanning'
import VacationPlanningResult from '@/components/vriddhi/VacationPlanningResult'


const vriddhiRoutes = [{
  path: '/vriddhi',
  name: 'vriddhi',
  meta: {
    title: 'Vriddhi : Personal Finance'
  },
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: VriddhiLayout,
  children: [
    {
      path: 'goal-planner',
      component: PlannerLayout,
      children: [
        {
          path: '',
          name: 'Goal Planner',
          component: PlannerList
        },
        {
          path: 'dream-car',
          name: 'Dream Car Form',
          component: DreamCar
        },
        {
          path: 'dream-car-result',
          name: 'Dream Car Result',
          component: DreamCarResult
        },
        {
          path: 'dream-house',
          name: 'Dream House Form',
          component: DreamHouse
        },
        {
          path: 'dream-house-result',
          name: 'Dream House Result',
          component: DreamHouseResult
        },
        {
          path: 'vacation-planning',
          name: 'Vacation Planning Form',
          component: VacationPlanning
        },
        {
          path: 'vacation-planning-result',
          name: 'Vacation Planning Result',
          component: VacationPlanningResult
        }
      ]
    }
  ]
}]

export default vriddhiRoutes
