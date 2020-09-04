import axios from "axios";

const getBackendUrl = "https://contenthub-api.eco.astro.com.my/channel";

const Backend = (() => {
  return {
    get: (path, param) => axios.get(`${getBackendUrl}${path}`, param),
    // Note: These might be used later
    // delete: (path, param) => axios.delete(`${getBackendUrl}${path}`, param),
    // post: (path, param) => axios.post(`${getBackendUrl}${path}`, param),
    // put: (path, param) => axios.put(`${getBackendUrl}${path}`, param),
  };
})();

export default Backend;
