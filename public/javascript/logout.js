async function logout(event) {
	if (event) {
		event.preventDefault();
	}

	const response = await fetch("/api/users/logout", {
		method: "post",
		headers: { "Content-Type": "application/json" }
	});
  
	if (response.ok) {
		document.location.replace("/");
	} else {
		alert(response.statusText);
	}
}

document.querySelector("#logout").addEventListener("click", logout);

setTimeout(function(){ logout(null); }, 900000); // Auto-logout after 15 minutes.