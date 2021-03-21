document.querySelector('form').addEventListener('submit', onRegisterSubmit);

async function onRegisterSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target)

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    if (email == ''|| password == '') {
      return alert('All fields are required!')
    } else if (password !== rePass) {
        return alert("Passwords don't match")
    }

    const post = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    };
    const res = await fetch('http://localhost:3030/users/register', post);
    const data = await res.json();

    if (res.ok == false) {
        return alert(data.message);
    }

    sessionStorage.setItem('userToken', data.accessToken);
    window.location.pathname = 'index.html';
}