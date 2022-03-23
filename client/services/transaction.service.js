import ApiService from "./api.service";

const TransactionService = {
  async fetch(date = null){
    // return ApiService.get(`/transactions/date/${date ?? ''}`)
    return ApiService.get(`/transactions`)
  }
}

export default TransactionService;