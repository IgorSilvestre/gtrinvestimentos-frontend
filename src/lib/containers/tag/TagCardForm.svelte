<script lang="ts">
	import { createForm } from 'svelte-forms-lib'
	import type { ITag } from '$lib/interfaces-validation/IVTag'
	import { VTag } from '$lib/interfaces-validation/IVTag'
	import Icon from '@iconify/svelte'
	import { API } from '$lib/api/apiFetch'
	import { fade, fly } from 'svelte/transition'
	import { createEventDispatcher } from 'svelte'
	import { transitionOptions } from '$lib/config'

	export let tag: ITag
	let isEditing = false

	function toggleEdit() {
		isEditing = !isEditing
	}

	const dispatch = createEventDispatcher()
	async function deleteTag() {
		try {
			await API.delete('v1/tag/' + tag._id)

			// If the request is successful, emit the 'remove' event
			dispatch('remove', tag._id)
		} catch (error) {
			console.error('Error deleting tag:', error)
		}
	}

	const { form, errors, touched, handleChange, handleSubmit } = createForm({
		initialValues: {
			label: tag?.label ?? ''
		},
		validationSchema: VTag,
		onSubmit: (tagUpdated) => {
			try {
				API.put('v1/tag/' + tag._id, tagUpdated)
			} catch (e) {
				console.error(e)
			}
			toggleEdit()
		}
	})
</script>

<div
	id="tag-card-{tag._id}"
	in:fly={transitionOptions.defaultFlyEntry}
	out:fly|local={transitionOptions.defaultFlyExit}
>
	<div class="bg-white p-4 rounded-lg overflow-hidden shadow-lg border-solid border-2 mx-4 my-2">
		<form on:submit={handleSubmit}>
			<div class="flex justify-between flex-row items-center">
				<div>
					{#if isEditing}
						<div in:fade={transitionOptions.defaultFade}>
							<label for="label">Nome</label>
							<input
								type="text"
								id="label"
								name="label"
								value={$form.label}
								on:change={handleChange}
							/>
						</div>
						{#if $touched.label && $errors.label}
							<p>{$errors.label}</p>
						{/if}
					{:else}
						<h2
							in:fade={transitionOptions.defaultFade}
							class="text-lg font-medium text-gray-900 mb-2"
						>
							{$form.label}
						</h2>
					{/if}
				</div>
				<div>
					{#if isEditing}
						<div in:fade={transitionOptions.defaultFade}>
							<button type="submit" class="btn variant-filled-secondary btn-sm">Submit</button>
						</div>
					{:else}
						<div in:fade={transitionOptions.defaultFade}>
							<button type="button" class="btn-icon variant-filled-secondary" on:click={toggleEdit}>
								<Icon icon="ic:baseline-edit" color="white" />
							</button>
							<button type="button" class="btn-icon variant-filled-error" on:click={deleteTag}>
								<Icon icon="carbon:trash-can" color="white" />
							</button>
						</div>
					{/if}
				</div>
			</div>
		</form>
	</div>
</div>
