export default {
  computed: {
    isValid() {
      if (this.errors && this.errors.items.length > 0) return false;
      for (const key in this.$children) {
        const element = this.$children[key];
        if (element.isValid == false) {
          return false;
        }
      }
      return true;
    }
  }
}
