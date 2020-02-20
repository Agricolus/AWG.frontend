import Vue from "vue"
import { Component, Prop } from "vue-property-decorator";

@Component({ name: "card" })
export default class Card extends Vue {


  @Prop({ default: null })
  title: string;

  @Prop({ default: null })
  weatherIcon: string;

  @Prop({ default: null })
  mainInformation: string;

  @Prop({ default: null })
  unit: string;

  @Prop({ default: null })
  icon: string

  @Prop({ default: null })
  min: string;

  @Prop({ default: null })
  max: string;

  @Prop({ default: null })
  below: string;
}
