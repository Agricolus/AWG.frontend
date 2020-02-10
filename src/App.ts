import Vue from "vue"
import Component from "vue-class-component";
import FullLayout from "./layout/fullLayout.vue";
import Sidebar from "./layout/sidebar.vue";

@Component({
  name: "full",
  components: {
    FullLayout,
    Sidebar
  }
}
)
export default class App extends Vue
{

}
