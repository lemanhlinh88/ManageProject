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
function render(){
	var htl = projects.map(project => `
		<button class="button-project">${project.name}</button>
	`).join('');

	var create_user = projects[0].users.map(user => `
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
								<input type="text" name="" value="${user.name}">
							</div> -->
						</div>
					</div>
		`).join('');

	var create_work = projects[0].users[0].user.map(function(currentValue, index, arr) {
		var html = '<input type="text" name="" value="'+currentValue+'"></input>'
		return html
	}).join(' ');
	console.log(create_user)
	$('#menu-part').html(create_user);
	$('.name').html(create_work);
	
	
	$('.Project').html(htl);
}
function add_work(index, index_user){
	
	console.log(projects[index].users[index_user])
	projects[index].users[index_user].user.push("work 2");
	render();
}
function add_User(index){
	projects[index].users.push({
		name : 'New User',
		user : [
			'Work 1'
		]
	});
	render();
}