import Vue from "vue"
import { Component, Prop } from "vue-property-decorator";

@Component({ name: "card" })
export default class Card extends Vue {
  @Prop({ default: null })
  title: string;

  @Prop({ default: null })
  condition: string;

  @Prop({ default: null })
  icon: string;
}
