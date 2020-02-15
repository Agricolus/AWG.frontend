import Vue from "vue"
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "card"
})
export default class Card extends Vue {


  @Prop()
  title: string;


  @Prop()
  weatherIcon: string;

  @Prop()
  mainInformation: string;

  @Prop()
  unit: string;

  @Prop()
  icon: string

  @Prop()
  min: string;

  @Prop()
  max: string;

}
