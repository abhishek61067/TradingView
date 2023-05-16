<script>
import { useTickerStore } from '@/stores/tickerStore'
import { useCompanyEssentialStore } from '@/stores/companyEssentialStore'
import requester from '../../../lib/requester'

export default {
  name: "CompanyEssentials",
  components: {},
  data() {
    return {
      essentials: {},
    }
  },
  setup() {
    const store = useTickerStore()
    const essentialStore = useCompanyEssentialStore()
    return {
      store,
      essentialStore
    }
  },
  mounted() {
    this.essentialStore.getCompanyEssentials(this.store.company.id)
  },
}
</script>

<template>
  <div class="card essential-card">
    <div class="card-header header-elements-inline pt-1 pb-1 bg-brand">
      <h5 class="card-title">
        Company Essentials
      </h5>
      <div class="header-elements">
        <span class="badge badge-icon cursor-pointer text-white" @click="() => store.toggleSideTab('', 'hide')">
          <i class="icon-cross2"></i>
        </span>
      </div>
    </div>
    <div class="card-body p-2 pr-3">
      <div class="row">
        <div class="col-md-6 border-bottom">
          <div class="mb-3">
            <span class="mb-0">
              Book Value
            </span>
            <h6 class="fw-bold text-dark">
              {{ helper.formatDecimal(essentialStore.essentials.book_value) }}
            </h6>
          </div>
        </div>

        <div class="col-md-6 border-bottom">
          <div class="mb-3">
            <span class="mb-0">
              Paid Up Capital
            </span>
            <h6 class="fw-bold text-dark">
              {{ helper.amountToWord(essentialStore.essentials.paid_up_capital) }}
            </h6>
          </div>
        </div>

        <div class="col-md-6 border-bottom">
          <div class="mb-3">
            <span class="mb-0">
              Dividend Capacity
            </span>
            <h6 class="fw-bold text-dark">
              {{ helper.formatDecimal(essentialStore.essentials.dividend_capacity) }}
            </h6>
          </div>
        </div>

        <div class="col-md-6 border-bottom">
          <div class="mb-3">
            <span class="mb-0">
              Earning Per Share
            </span>
            <h6 class="fw-bold text-dark">
              {{ helper.formatDecimal(essentialStore.essentials.earning_per_share) }}
            </h6>
          </div>
        </div>

        <div class="col-md-6 border-bottom">
          <div class="mb-3">
            <span class="mb-0">
              Number of shares
            </span>
            <h6 class="fw-bold text-dark">
              {{ helper.separateByCommas(essentialStore.essentials.number_of_shares) }}
            </h6>
          </div>
        </div>

        <div class="col-md-6 border-bottom">
          <div class="mb-3">
            <span class="mb-0">
              Net sales growth
            </span>
            <h6 class="fw-bold text-dark">
              {{ essentialStore.essentials.net_sales_growth }}
            </h6>
          </div>
        </div>

        <div class="col-md-6 border-bottom">
          <div class="mb-3">
            <span class="mb-0">
              Promoter holding
            </span>
            <h6 class="fw-bold text-dark">
              {{ essentialStore.essentials.promoter_holding }}
            </h6>
          </div>
        </div>

        <div class="col-md-6 border-bottom">
          <div class="mb-3">
            <span class="mb-0">
              Return on equity
            </span>
            <h6 class="fw-bold text-dark">
              {{ helper.formatDecimal(essentialStore.essentials.return_on_equity) }}
            </h6>
          </div>
        </div>

        <div class="col-md-6 border-bottom">
          <div class="mb-3">
            <span class="mb-0">
              Divident payout
            </span>
            <h6 class="fw-bold text-dark">
              {{ helper.formatDecimal(essentialStore.essentials.divident_payout) }}
            </h6>
          </div>
        </div>

        <div class="col-md-6 border-bottom">
          <div class="mb-3">
            <span class="mb-0">
              Market Capitalization
            </span>
            <h6 class="fw-bold text-dark">
              {{ helper.amountToWord(essentialStore.essentials.market_capitalization) }}
            </h6>
          </div>
        </div>

        <div class="col-md-6 border-bottom">
          <div class="mb-3">
            <span class="mb-0">
              Sectoral PE
            </span>
            <h6 class="fw-bold text-dark">
              {{ essentialStore.essentials.sectoral_pe }}
            </h6>
          </div>
        </div>

        <div class="col-md-6 border-bottom">
          <div class="mb-3">
            <span class="mb-0">
              Price per earning
            </span>
            <h6 class="fw-bold text-dark">
              {{ helper.formatDecimal(essentialStore.essentials.price_per_earning) }}
            </h6>
          </div>
        </div>

        <div class="col-md-6 border-bottom">
          <div class="mb-3">
            <span class="mb-0">
              Price per book value
            </span>
            <h6 class="fw-bold text-dark">
              {{ helper.formatDecimal(essentialStore.essentials.price_per_book_value) }}
            </h6>
          </div>
        </div>

        <div class="col-md-6 border-bottom">
          <div class="mb-3">
            <span class="mb-0">
              Three year CAGR
            </span>
            <h6 class="fw-bold text-dark">
              {{ helper.formatDecimal(essentialStore.essentials.three_year_cagr) }}
            </h6>
          </div>
        </div>

        <div class="col-md-6 border-bottom">
          <div class="mb-3">
            <span class="mb-0">
              One year yield
            </span>
            <h6 class="fw-bold text-dark">
              {{ helper.formatDecimal(essentialStore.essentials.one_year_yield) }}
            </h6>
          </div>
        </div>

      </div>
      
    </div>
  </div>
</template>

<style scoped>
.essential-card {
  height: 100vh;
  overflow: scroll;
}

</style>