<script lang="ts">
	let user = $state({
		name: 'John Doe',
		email: 'john@example.com',
		goal: 'Lose weight',
		joined: '2023-01-15',
	});
</script>

<h1 class="text-3xl font-bold mb-6">User Profile</h1>

<div class="card bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title">{user.name}</h2>
		<p>Email: {user.email}</p>
		<p>Fitness Goal: {user.goal}</p>
		<p>Member since: {user.joined}</p>
		<div class="card-actions justify-end">
			<button class="btn btn-primary">Edit Profile</button>
		</div>
	</div>
</div>