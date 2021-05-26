const projects = [
	{
		name: 'New Project',
		users: [
			{
				name : 'New User',
				user : [
					'Work 1'
				]
			}
		]
	}
];

function add_project(){
	projects.push({
		name: 'New project',
		users: [
			{
				name : 'New User',
				user : [
					'Work 1'
				]
			}
		]
	});
	render();
};

$('#add').click(function(){
	add_project();
})


function add_User(index){
	projects[index].users.push({
		name : 'New User',
		user : [
			'Work 1'
		]
	});
	render();
}

$('.share-add').click(function(){
	add_User(0);
})

function add_work(index, index_user){
	projects[index].users[index_user].push('work 2');
	render();
}

$('#part-add').click(function(){
	add_work(0, 0);
})

function render(){
	const htl = projects.map(project => `
		<button class="button-project">${project.name}</button>
	`).join('');

	const create_user = projects[0].users.map(user => `
					<div class="part">
						<p>
							<input type="text" name="" value="New User">
							<button class="close">x</button>
							<button class="part-add">+</button>
						</p>

						<div class="select">
							<div class="name">
								<input type="text" name="" value="Work 1">
							</div>
							<!-- <div class="user">
								<input type="text" name="" value="Person1">
							</div> -->

						</div>
					</div>
		`).join('');

	const create_work = projects[0].users[0].user.map(us => `
				<input type="text" name="" value="Work 1">
			`).join('');

	$('.name').html(create_work);

	$('#menu-part').html(create_user);

	$('.Project').html(htl);
}

render();





