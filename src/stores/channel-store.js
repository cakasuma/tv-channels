import { decorate, observable, action, computed } from "mobx";
import { API } from "backend";

class ChannelStore {
  channels = [];
  is_loading = false;
  has_error = false;

  getChannelData = async () => {
    // Check if we have cached channel data, don't need to set loading to render loading view
    if (this.has_loaded) {
      this.is_loading = true;
    }
    try {
      const channel_response = await API.get("/all.json");
      this.channels = channel_response?.response;
    } catch (err) {
      this.has_error = true;
    }

    this.is_loading = false;
  };

  get has_loaded() {
    return this.channels.length > 0;
  }
}

decorate(ChannelStore, {
  channels: observable,
  is_loading: observable,
  has_error: observable,
  getChannelData: action,
  has_loaded: computed,
});
export default ChannelStore;
