<script lang="ts">
	import {emojis, pickedEmoji} from './store';

	console.log($pickedEmoji);

  import Header from "./layout/Header.svelte";
	import Footer from "./layout/Footer.svelte";
	import Textarea from "./components/Textarea.svelte";
	import CopyButton from "./components/CopyButton.svelte";

	let rawValue = `- The first cool thing to do\n- The second even cooler thing\n- The third mediocre one`;

	$: processedValue = rawValue.replaceAll('\n-', `\n${$pickedEmoji}`);
	$: {
		if (rawValue[0] === '-') {
			processedValue = $pickedEmoji + processedValue.slice(1);
		}
	}
</script>

<svelte:head>
	<title>Emojify your bullet list</title>
	<link
		rel="icon"
		href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>{$pickedEmoji}</text></svg>"
	/>
</svelte:head>

<Header />

<main class="flex flex-1 p-8">
	<div class="container flex justify-center items-center">
		<div class="flex md:flex-row flex-col items-center md:space-x-10 md:space-y-0 space-y-10">
			<Textarea bind:value={rawValue} name="raw-list" />

			<div class="md:w-24 p-1 space-y-3">
				{#each $emojis as group}
					<div class="space-y-2">
						<p>{group.text}</p>

						<div class="flex justify-between items-center flex-wrap">
							{#each group.emojis as emoji}
								<label
									for={emoji}
									class="flex justify-center items-center p-0.5 border-2 border-solid rounded cursor-pointer"
									class:border-transparent={emoji !== $pickedEmoji}
									class:border-neutral-300={emoji === $pickedEmoji}
									class:dark:border-neutral-400={emoji === $pickedEmoji}
								>
									<input
										type="radio"
										class="hidden"
										id={emoji}
										value={emoji}
										bind:group={$pickedEmoji}
									/>

									<span>
										{emoji}
									</span>
								</label>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<div class="relative md:w-80 w-full">
				<CopyButton value={processedValue} className="absolute top-0 right-0" />

				<Textarea value={processedValue} name="bullet-list" readonly={true} />
			</div>
		</div>
	</div>
</main>

<Footer />
