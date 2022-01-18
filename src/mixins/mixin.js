export default {
  created() {
    window.addEventListener('resize', this.myEventHandler)
  },
  mounted() {
    this.myEventHandler()
  },
  data() {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: false,
    }
  },
  methods: {
    myEventHandler() {
      if (window.innerWidth < 768) {
        this.isMobile = true
        this.isTablet = false
        this.isDesktop = false
      } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
        this.isTablet = true
        this.isMobile = false
        this.isDesktop = false
      } else if (window.innerWidth > 1024) {
        this.isDesktop = true
        this.isMobile = false
        this.isTablet = false
      }
    },
  },
  destroyed() {
    window.removeEventListener('resize', this.myEventHandler)
  },
}
