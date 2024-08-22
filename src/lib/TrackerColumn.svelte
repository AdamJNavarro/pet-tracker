<script lang="ts">
	import BathIcon from '$assets/bathed.png';
	// import FoodIcon from '$assets/dog-food.png';
	import GroomIcon from '$assets/groom.png';
	import NameIcon from '$assets/pet-name-card.png';
	import OutsideIcon from '$assets/outside.png';
	import WalkIcon from '$assets/dog-walk.png';

	const image_size = '80px';
</script>

<div class="container">
	<div class="header">
		<img alt="pet name icon" src={NameIcon} height={image_size} width={image_size} />
	</div>
	<div class="tracker">
		<img alt="outside icon" src={OutsideIcon} height={image_size} width={image_size} />
	</div>
	<div class="tracker">
		<img alt="pet walk icon" src={WalkIcon} height={image_size} width={image_size} />
	</div>
	<div class="tracker">
		<img alt="pet bath icon" src={BathIcon} height={image_size} width={image_size} />
	</div>
	<div class="tracker">
		<img alt="pet groom icon" src={GroomIcon} height={image_size} width={image_size} />
	</div>
	<!-- <div class="tracker"><img alt="pet food icon" src={FoodIcon} height={image_size} width={image_size} /></div> -->
</div>

<style>
	.container {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.header {
		display: flex;
		flex-direction: column;
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.tracker {
		display: flex;
		flex-direction: column;
		flex: 1;
		border-top: 0.5px;
		border-color: #334155;
		border-top-style: solid;
		justify-content: center;
		align-items: center;
	}
</style>
