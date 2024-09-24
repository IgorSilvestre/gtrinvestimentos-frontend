<script lang="ts">
	import type { IPerson } from '$lib/interfaces-validation/IVPerson'
	import { formatPhoneNumber } from '$lib/shared/functions/formatPhoneNumber'

	export let contact: IPerson | undefined

	function makeVCard() {
		const fullName = contact?.name.trim() || ''
		const companyName = contact?.company?.name.trim() || ''
		const formattedPhone = formatPhoneNumber(contact?.phone || '')
		const email = contact?.email || ''

		let vCard = `BEGIN:VCARD\r\nVERSION:3.0\r\n`

		if (fullName) {
			const fullNameWithCompany = fullName + (companyName ? ` ${companyName}` : '')
			vCard += `N;CHARSET=UTF-8:${fullNameWithCompany}\r\n`
			vCard += `FN;CHARSET=UTF-8:${fullNameWithCompany}\r\n`
		}

		if (formattedPhone) {
			vCard += `TEL;TYPE=WORK,VOICE:${formattedPhone}\r\n`
		}

		if (email) {
			vCard += `EMAIL:${email}\r\n`
		}

		vCard += `END:VCARD\r\n`

		return vCard
	}

	function downloadVCard(e: Event) {
		e.preventDefault()
		const blob = new Blob([makeVCard()], { type: 'text/vcard' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = `${contact?.name.replace(/\s/g, '_')}.vcf`
		a.click()
		URL.revokeObjectURL(url)
	}
</script>

<button on:click={downloadVCard} class="text-blue-500 font-bold mr-4"> Exportar </button>
