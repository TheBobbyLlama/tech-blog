async function editFormHandler(event) {
	event.preventDefault();
    
	const id = window.location.toString().split("/")[
		window.location.toString().split("/").length - 1
	];

	const title = document.querySelector("#post-title").value;
	const body = document.querySelector("#post-body").value;

	const response = await fetch(`/api/posts/${id}`, {
		method: "PUT",
		body: JSON.stringify({
		  title,
		  body
		}),
		headers: {
		  "Content-Type": "application/json"
		}
	  });
	  
	if (response.ok) {
		document.location.replace("/dashboard");
	} else {
		alert(response.statusText);
	}
}

async function deleteButtonHandler(event) {
	event.preventDefault();
  
	const id = window.location.toString().split('/')[
		window.location.toString().split('/').length - 1
	];

	const response = await fetch('/api/posts/' + id, {
		method: 'DELETE',
	});
	  
	if (response.ok) {
		document.location.replace("/dashboard");
	} else {
		alert(response.statusText);
	}
}
  
document.querySelector("#edit-post").addEventListener("submit", editFormHandler);
document.querySelector("#delete-button").addEventListener("click", deleteButtonHandler);