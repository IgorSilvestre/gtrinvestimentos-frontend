<script lang='ts'>
import { copyToClipboard } from "$lib/shared/functions/copyToClipboard"
import { toastCopied } from '$lib/config'
import { toastStore } from '@skeletonlabs/skeleton'
import { createEventDispatcher } from "svelte"
import Loader from "$lib/modules/Loader.svelte"
import { fetchBusinessEmail } from '$lib/api/queries/external/fetchBusinessEmail'

let fullName = ''
let domain = ''
let isLoadingEmailButton = false
let emailFound = { email: '', score: 0 }

async function handleFetchBusinessEmail () {
    isLoadingEmailButton = true
    let possibleBusinessEmail = await fetchBusinessEmail(fullName, domain)
    if (possibleBusinessEmail?.score && possibleBusinessEmail?.email) {
        emailFound.email = possibleBusinessEmail.email
        emailFound.score= possibleBusinessEmail.score
    }
    isLoadingEmailButton = false

}

const dispatch = createEventDispatcher()
</script>

<main class="w-full px-4 sm:px-6 lg:px-8">
    <div class="mt-10 w-full max-w-4xl mx-auto">
        <div class="flex flex-col">
            <label class="text-center block uppercase tracking-wide font-bold mb-4" for="name"> Verificar Email </label>
            <div class="w-full flex flex-col sm:flex-row sm:items-end sm:justify-between space-y-4 sm:space-y-0">
                <div class="w-full sm:flex-1">
                    <p class="mb-2">Nome Completo</p>
                    <input
                    class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    id="searchText"
                    bind:value={fullName}
                    on:keypress={(e) => e.key === 'Enter' && dispatch('search')}
                    />
                </div>
                <span class="hidden sm:flex font-bold align-bottom mx-2 items-center text-2xl">@</span>
                <div class="w-full sm:flex-1">
                    <p class="mb-2">Domínio</p>
                    <input
                    class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    id="searchText"
                    bind:value={domain}
                    on:keypress={(e) => e.key === 'Enter' && dispatch('search')}
                    />
                </div>
                <div class="w-full sm:w-auto flex justify-end sm:justify-start">
                    <button
                        on:click={handleFetchBusinessEmail}
                        class="bg-blue-500 md:ml-4 w-full sm:w-auto py-3 px-6 rounded-sm text-sm text-white font-bold self-end"
                    >Buscar E-mail</button>
                </div>
            </div>
        </div>
        <div>
            {#if emailFound.email && emailFound.score > 0}
                <p class="mt-2">Email encontrado: 
                    <span 
                        class="text-lg font-bold cursor-pointer"
                        on:click={() => {
                            copyToClipboard(emailFound.email)
                            toastStore.trigger(toastCopied)
                        }}
                        on:keypress={() => {
                            copyToClipboard(emailFound.email)
                            toastStore.trigger(toastCopied)
                        }}>
                        {emailFound.email}
                    </span>
                    - <span class="text-lg font-bold text-green-400">{emailFound.score}</span></p>
            {:else if isLoadingEmailButton}
                <Loader />
            {/if}
        </div>
    </div>
</main>
