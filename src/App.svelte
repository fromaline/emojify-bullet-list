<script>
  import Header from "./components/Header.svelte";

	let rawValue = `- The first cool thing to do\n- The second even cooler thing\n- The third mediocre one`;

	const groupedEmojis = [
		{
			text: 'Positive',
			emojis: ['✅', '🎯', '👌', '👍']
		},
		{
			text: 'Negative',
			emojis: ['❌', '❎', '🅾', '⭕', '⛔', '🚫']
		},
		{
			text: 'Neutral',
			emojis: ['👉', '➡', '▶', '✴', '⚫', '⚪', '🔴', '🔵', '💠', '🔶', '🔷', '🔸', '🔹', '🔰', '⬜']
		}
	];

	let selectedEmoji = groupedEmojis[0].emojis[0];

	$: listifyValue = rawValue.replaceAll('\n-', `\n${selectedEmoji}`);
	$: {
		if (rawValue[0] === '-') {
			listifyValue = selectedEmoji + listifyValue.slice(1);
		}
	}
</script>

<svelte:head>
	<title>Emojify your bullet list</title>
	<link
		rel="icon"
		href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>{selectedEmoji}</text></svg>"
	/>
</svelte:head>

<Header />

<div class="flex flex-1 pb-10">
	<div class="container flex justify-center items-center">
		<div class="flex md:flex-row flex-col items-center md:space-x-10 md:space-y-0 space-y-10">
			<textarea
				name="raw-list"
				id="raw-list"
				class="resize-none outline-none border-2 border-solid border-black p-3 h-auto md:w-80 w-full bg-white dark:bg-neutral-900 dark:border-white"
				rows="16"
				bind:value={rawValue}
			/>

			<div class="md:w-24 p-1 space-y-3">
				{#each groupedEmojis as group}
					<div class="space-y-2">
						<p>{group.text}</p>

						<div class="flex justify-between items-center flex-wrap">
							{#each group.emojis as emoji}
								<label
									for={emoji}
									class="flex justify-center items-center p-0.5 border-2 border-solid rounded cursor-pointer"
									class:border-transparent={emoji !== selectedEmoji}
									class:border-black={emoji === selectedEmoji}
									class:dark:border-white={emoji === selectedEmoji}
								>
									<input
										type="radio"
										class="hidden"
										id={emoji}
										value={emoji}
										bind:group={selectedEmoji}
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

			<textarea
				name="bullet-list"
				id="bullet-list"
				class="resize-none outline-none border-2 border-solid border-black p-3 h-auto md:w-80 w-full bg-white dark:bg-neutral-900 dark:border-white"
				rows="16"
        readonly
				bind:value={listifyValue}
			/>
		</div>
	</div>
</div>
