<script lang="ts">
	import logo from '$lib/cover.webp';
	import pureHeroine from '$lib/pureHeroine.png';
	import ifYouleave from '$lib/ifYouleave.jpg';
	import sour from '$lib/sour.webp';
	import iver from '$lib/iver.jpg';

	function shrinkWrap(element: HTMLElement) {
		const { firstChild, lastChild } = element;
		if (!element || !firstChild || !lastChild) return;
		const range = document.createRange();
		range.setStartBefore(firstChild);
		range.setEndAfter(lastChild);
		const { width } = range.getBoundingClientRect();
		element.style.width = width + 'px';
		element.style.boxSizing = 'content-box';
	}
</script>

<div class="flex size-full flex-col items-center gap-8 bg-[#C47F74]">
	<!-- <div
		class="line-clamp-1 w-full text-center font-[Ultra] text-xl text-nowrap text-white/50 italic"
	>
		Same old story, time again &emsp; Got so close but then you lost it &emsp; Should've listened to
		your friends &emsp; 'Bout his girlfriend back in Boston &emsp; You sent him pictures and
		playlists and phone sex &emsp; He disappeared from the second that you said &emsp; "Let's get
		coffee, let's meet up" &emsp; I'm so sick of online love &emsp;
	</div> -->

	<span class="mt-16 flex w-4/5 flex-col items-center">
		<div
			class="w-fit rounded-4xl bg-white p-6 text-center font-[Ultra] text-6xl text-[#C47F74]"
			use:shrinkWrap
		>
			The Rise and Fall of a Midwest Princess
		</div>
	</span>

	<div
		class="relative overflow-clip rounded-tl-[4rem] rounded-tr-4xl rounded-br-[4rem] rounded-bl-4xl"
	>
		<img src={logo} class="size-96 blur-3xl brightness-125" alt="cover" />
		<img src={iver} class="absolute top-8 left-8 size-80" alt="cover" />
	</div>

	<span class="flex w-3/5 flex-col items-center">
		<div use:shrinkWrap class="rounded-2xl p-4 font-[Ultra] text-2xl text-white/90">
			by Chapelle Roan
		</div>
	</span>

	<div
		class="line-clamp-1 w-full text-center font-[Ultra] text-xl leading-[100%] text-nowrap text-white/50 italic"
	>
		Femininomenon &emsp; Red Wine Supernova &emsp; After Midnight &emsp; Coffee &emsp; Casual &emsp;
		Super Graphic Ultra Modern Girl &emsp; Hot to G &emsp; My Kink Is Karma &emsp; Picture You
		&emsp; Kaleidoscope &emsp; Pink Pony Club &emsp; Naked in Manhattan &emsp; California &emsp;
	</div>
</div>

<div class="flex size-full flex-col items-center gap-8 bg-[#070C0C]">
	<!-- <div
		class="font-[Roboto Flex] line-clamp-1 w-full text-center text-xl font-extrabold text-nowrap text-white/50 italic font-stretch-extra-expanded"
	>
		Don't you think that it's &emsp; Boring how people talk? &emsp; Making smart with their words
		again &emsp; Well, I'm bored &emsp; Because &emsp; I'm doing this for the thrill of it, killin'
		it &emsp; Never not chasin' a million things I want &emsp; And I am Only as young as the minute
		is, full of it &emsp; Getting pumped up on the little bright things I bought &emsp; But I know
		they'll never own me (Yeah) &emsp;
	</div> -->

	<span class="mt-16 flex w-4/5 flex-col items-center">
		<div
			class="font-[Roboto Flex] w-fit rounded-4xl bg-white p-6 text-center text-6xl font-extrabold text-[#070C0C] font-stretch-expanded"
			use:shrinkWrap
		>
			PURE HEROINE
		</div>
	</span>

	<div class="relative overflow-clip">
		<img src={pureHeroine} class="size-96 blur-3xl brightness-125" alt="cover" />
		<img src={pureHeroine} class="absolute top-8 left-8 size-80" alt="cover" />
	</div>

	<span class="flex w-3/5 flex-col items-center">
		<div
			use:shrinkWrap
			class="font-[Roboto Flex] rounded-2xl p-4 text-2xl font-extrabold text-white/90 font-stretch-expanded"
		>
			by Lorde
		</div>
	</span>

	<div
		class="font-[Roboto Flex] line-clamp-1 w-full text-center text-xl leading-[100%] font-extrabold text-nowrap text-white/50 italic font-stretch-extra-expanded"
	>
		Tennis Court &emsp; 400 Lux &emsp; Royals &emsp; Ribs &emsp; Buzzcut Season &emsp; Team &emsp;
		Glory and Gore &emsp; Still Sane &emsp; White Teeth Teens &emsp; A World Alone &emsp;
	</div>
</div>

<div class="flex size-full flex-col items-center gap-8 bg-[#8E8CBB]">
	<!-- <div
		class="font-[Ultra] line-clamp-1 w-full text-center text-xl font-light text-nowrap text-white/50 italic font-stretch-extra-expanded"
	>
		Drifting apart like two sheets of ice, my love &emsp; Frozen hearts growing colder with time
		&emsp; There's no heat from our mouths &emsp; Please take me back to when I was yours &emsp;
	</div> -->

	<span class="mt-16 flex w-4/5 flex-col items-center">
		<div
			class="w-fit rounded-4xl bg-white p-6 text-center font-[Ultra] text-6xl font-light text-[#8E8CBB] font-stretch-expanded"
			use:shrinkWrap
		>
			Sour
		</div>
	</span>

	<div class="relative overflow-clip rounded-tl-4xl rounded-tr-2xl rounded-br-4xl rounded-bl-2xl">
		<img src={sour} class="size-96 blur-3xl brightness-125" alt="cover" />
		<img src={sour} class="absolute top-8 left-8 size-80" alt="cover" />
	</div>

	<span class="flex w-3/5 flex-col items-center">
		<div
			use:shrinkWrap
			class="rounded-2xl p-4 font-[Ultra] text-2xl font-light text-white/90 font-stretch-expanded"
		>
			by Olivia Rodrigo
		</div>
	</span>

	<div
		class="line-clamp-1 w-full text-center font-[Ultra] text-xl leading-[100%] font-light text-nowrap text-white/50 italic font-stretch-extra-expanded"
	>
		Winter &emsp; Smother &emsp; Youth &emsp; Still &emsp; Lifeforms &emsp; Tomorrow &emsp; Human
		&emsp; Touch &emsp; Amsterdam &emsp; Shallows &emsp;
	</div>
</div>

<div class="flex size-full flex-col items-center gap-8 bg-[#909095]">
	<!-- <div
		class="font-[Roboto Flex] line-clamp-1 w-full text-center text-xl font-light text-nowrap text-white/50 italic font-stretch-extra-expanded"
	>
		Drifting apart like two sheets of ice, my love &emsp; Frozen hearts growing colder with time
		&emsp; There's no heat from our mouths &emsp; Please take me back to when I was yours &emsp;
	</div> -->

	<span class="mt-16 flex w-4/5 flex-col items-center">
		<div
			class="font-[Roboto Flex] w-fit rounded-4xl bg-white p-6 text-center text-6xl font-light text-[#909095] font-stretch-expanded"
			use:shrinkWrap
		>
			IF YOU LEAVE
		</div>
	</span>

	<div class="relative overflow-clip rounded-tl-4xl rounded-tr-2xl rounded-br-4xl rounded-bl-2xl">
		<img src={ifYouleave} class="size-96 blur-3xl brightness-125" alt="cover" />
		<img src={ifYouleave} class="absolute top-8 left-8 size-80" alt="cover" />
	</div>

	<span class="flex w-3/5 flex-col items-center">
		<div
			use:shrinkWrap
			class="font-[Roboto Flex] rounded-2xl p-4 text-2xl font-light text-white/90 font-stretch-expanded"
		>
			by Daughter
		</div>
	</span>

	<div
		class="font-[Roboto Flex] line-clamp-1 w-full text-center text-xl leading-[100%] font-light text-nowrap text-white/50 italic font-stretch-extra-expanded"
	>
		Winter &emsp; Smother &emsp; Youth &emsp; Still &emsp; Lifeforms &emsp; Tomorrow &emsp; Human
		&emsp; Touch &emsp; Amsterdam &emsp; Shallows &emsp;
	</div>
</div>
