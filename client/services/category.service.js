import ApiService from "./api.service";

const CategoryService = {
  async fetch(){
    return ApiService.get('/categories')
  },
  async delete(id){
    return ApiService.delete(`/categories/${id}`)
  }
}

export default CategoryService;