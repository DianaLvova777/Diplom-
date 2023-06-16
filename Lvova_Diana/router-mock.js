import Vue from 'vue'

Vue.component('RouterLink', {
	props: {
		tag: { type: String, default: 'a' }
	},
	render(createElement) {
		const href = this.$attrs.to
		return createElement(
			this.tag,
			{
				attrs: { href },
				on: {
					click(e) {
						console.log('Navigated to: ', href)
						e.preventDefault()
					}
				}
			},
			this.$slots.default
		)
	}
})