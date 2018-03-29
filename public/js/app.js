$(document).ready(function () {
	var properties = getSource();
	var source = properties['source'];
	var template = Handlebars.compile(source);
	var context = properties['context'];

	var html = template(context);
	$(document.body).append(html);

	$('ul.tabs').tabs();
});

function getSource(){
	var arr = [];

	if($("#details-template").length){
		arr['source'] = $("#details-template").html();
		arr['context'] = loadDetails();
	}
	
	if($("#roles-template").length){
		arr['source'] = $("#roles-template").html();
		arr['context'] = loadRoles();
	}

	if($("#rolesList-template").length){
		arr['source'] = $("#rolesList-template").html();
		arr['context'] = loadRolesList();
	}

	if($("#user-template").length){
		arr['source'] = $("#user-template").html();
		arr['context'] = loadUserForm();
	}

	if($("#userList-template").length){
		arr['source'] = $("#userList-template").html();
		arr['context'] = loadUserList();
	}

	return arr;
}

function loadDetails(){
	return {
		website:{
			name: "Lehigh University",
		},
		company:{
			name: "Lehigh University",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
			email: "company@company.com",
			phone: "123-456-78910"
		}
	};
}

function loadRoles(){
	tableData = [{n: 1}, {n: 2}, {n: 3}, {n: 4}];
	return {
		header:{
			title: "Manage Roles",
		},
		roles:{
			name: "Role Name",
			email: "Email",
			status: "Status",
			permissions: "Permissions",
		},
		table:transform(tableData),
	};
}

function loadRolesList(){
	return {
		header:{
			title: "Manage Roles",
		},
		roles:{
			name: "Role Name",
			isActive: "Is Active",
			date: "Date",
			action: "Action",
		},
		table:transform(userRoles()),
	};
}

function loadUserForm(){
	return {
		header:{
			title: "Manage User",
		},
		user:{
			name: "Fullname",
			email: "Email",
			password: "Password",
			confirmPassword: "Confirm Password",
			selectRole: "Select Role",
			status: "Status",
		},
		roles: transform(userRoles()),
	};
}

function loadUserList(){
	return {
		header:{
			title: "Manage Users",
		},
		column:{
			name: "Full Name",
			email: "Email",
			isActive: "Is Active",
			date: "Date",
			action: "Action",
		},
		table:transform(userRoles()),
	};
}

function transform ( arr ) {
    var result = [], temp = [];
    arr.forEach( function ( elem, i ) {
        if ( i > 0 && i % 5 === 0 ) {
            result.push( temp );
            temp = [];
        }
        temp.push( elem );
    });
    if ( temp.length > 0 ) {
        result.push( temp );
    }
    return result;
}

function userRoles () {
	return 	[{n: 1, val: 'Administrator'}, {n: 2, val: 'Fiscal Manager'}, {n: 3, val: 'Legal Contractor'}];
}