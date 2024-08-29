<script lang="ts">
	import OutsideImage from '$assets/outside.png';
	import BathedImage from '$assets/bathed.png';
	import GroomedImage from '$assets/groomed.png';
	import WalkedImage from '$assets/walked.png';
	import FedImage from '$assets/fed.png';
	import MedsImage from '$assets/meds.png';
	import type { Activity } from '$lib';

	export let name: Activity;

	function get_img_src(name: Activity): string {
		if (name === 'fed') return FedImage;
		if (name === 'meds') return MedsImage;
		if (name === 'bathed') return BathedImage;
		if (name === 'groomed') return GroomedImage;
		if (name === 'outside') return OutsideImage;
		return WalkedImage;
	}
</script>

<img width="60" height="60" src={get_img_src(name)} alt={`${name} image`} />
