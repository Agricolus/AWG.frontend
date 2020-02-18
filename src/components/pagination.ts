import Vue from "vue"
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Paginator extends Vue {


  @Prop({ default: null })
  total: number;

  @Prop({ default: null })
  taken: number;

  @Prop({ default: null })
  skipped: number;

  perpage: number[] = [5, 10, 15, 20]

  private daystoshow: number = 7

  get pages() {
    if (!this.total || !this.taken) return null;
    let totalpages = Math.ceil(this.total / this.taken);
    let pages = []
    for (let i = 1; i <= totalpages; i++) {
      pages.push(i);
    }
    return pages;
  }

  get currentPage() {
    if (!this.taken) return null;
    return Math.ceil((this.skipped + this.taken) / this.taken);
  }

  get pagesHead() {
    if (!this.pages) return null;
    if (this.pages.length <= this.daystoshow) return null;
    if (this.currentPage <= (this.daystoshow - 2)) {
      return this.pages.slice(0, this.daystoshow - 1);
    }
    return this.pages.slice(0, 1);
  }

  get pagesTail() {
    if (!this.pages) return null;
    if (this.pages.length <= this.daystoshow) return null;
    let halfcontour = Math.floor(this.daystoshow / 2);
    if (this.currentPage >= (this.pages.length - halfcontour - 1)) {
      return this.pages.slice(-1 * (this.daystoshow - 1));
    }
    return this.pages.slice(-1);
  }

  get pagesMid() {
    if (!this.pages) return null;
    if (this.pages.length <= this.daystoshow) return this.pages;
    let halfcontour = Math.floor(this.daystoshow / 2);
    if (this.currentPage > (this.daystoshow - 2) && this.currentPage < (this.pages.length - halfcontour - 1)) {
      return this.pages.slice(this.currentPage - halfcontour, this.currentPage + halfcontour - 1);
    }
    return null;
  }

  get hasNext() {
    return (this.currentPage + 1) <= Math.ceil(this.total / this.taken)
  }

  get hasPrev() {
    return (this.currentPage - 2) >= 0

  }
  goToPreviousPage() {
    let prevp = (this.currentPage - 2) * this.taken;
    this.$emit('skip', prevp);
  }

  goToNextPage() {
    let nextp = this.currentPage * this.taken;
    this.$emit('skip', nextp)
  }

  goToPage(page: string) {
    this.$emit('skip', (parseInt(page) - 1) * this.taken)
  }
}
