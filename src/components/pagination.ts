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

  @Prop({ default: () => [5, 10, 15, 20] })
  perpage: number[];

  @Prop({ default: 7 })
  totalPagesToShow: number; //total number of pages selector including the ones in the extremes

  @Prop({ default: 1 })
  extemesPagesToShow: number; //number o pages selector to show on the extremes (for each extreme)

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
    if (this.pages.length <= this.totalPagesToShow) return null;
    let breakpoint = this.totalPagesToShow - (this.extemesPagesToShow * 2);
    if (this.currentPage <= breakpoint) {
      return this.pages.slice(0, this.totalPagesToShow - this.extemesPagesToShow);
    }
    return this.pages.slice(0, this.extemesPagesToShow);
  }

  get pagesTail() {
    if (!this.pages) return null;
    if (this.pages.length <= this.totalPagesToShow) return null;
    let breakpoint = this.pages.length - (this.totalPagesToShow - (this.extemesPagesToShow * 2));
    if (this.currentPage > breakpoint) {
      return this.pages.slice(-1 * (this.totalPagesToShow - this.extemesPagesToShow));
    }
    return this.pages.slice(-1 * this.extemesPagesToShow);
  }

  get pagesMid() {
    if (!this.pages) return null;
    if (this.pages.length <= this.totalPagesToShow) return this.pages;
    let breakpointHigh = this.pages.length - (this.totalPagesToShow - (this.extemesPagesToShow * 2));
    let breakpointLow = this.totalPagesToShow - (this.extemesPagesToShow * 2);
    let halfcontour = Math.floor((this.totalPagesToShow - this.extemesPagesToShow) / 2);
    if (this.currentPage > breakpointLow && this.currentPage <= breakpointHigh) {
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
