import axios from "axios";

const URL = axios.create({
  headers: {"Access-Control-Allow-Origin": "*", "mode": "cors"},
});

// This is the APwI service
// See server/routes/main.js to see where these routes connect to
class APIService {
  // createExample(msg) {
  //   return URL.post(`/examples/`, msg);
  // }
  // getAllExamples() {
  //   return URL.get("/examples/");
  // }
  getItemById(id) {
    return URL.get(`/item/${id}`);
  }
  deletePriceWatch(id) {
    return URL.delete(`/priceWatch/delete/${id}`)
  }
  // deleteAllExamples(groupId) {
  //   return URL.delete(`/examples/deleteAllExamples/${groupId}`)
  // }

  createPriceWatch(data) {
    return URL.post(`/priceWatch/`, data)
  }
  getUserPriceWatch(data) {
    return URL.post(`/priceWatch/priceWatchData`, data)
  }
  getRecentItems() {
    return URL.get(`/item/recent`)
  }

}

export default new APIService();