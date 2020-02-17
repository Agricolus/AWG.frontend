import Vue from "vue"
import Component from "vue-class-component";
import Sidebar from "./sidebar.vue";

@Component({
  name: "fullLayout",
  components: {
    Sidebar
  }
}
)
export default class FullLayout extends Vue
{

}
