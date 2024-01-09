window.addEventListener('load', () => {
    document.getElementById('login').addEventListener('click', (evt) => {
        evt.preventDefault();


        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };


        fetch('http://127.0.0.1:9001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( data => {
                console.log(data.role);
                if (data.msg) {
                    alert(data.msg);
                } else if (data.role === false) {
                    alert("You are not admin");
                } else {
                    document.cookie = `token=${data.token};SameSite=Lax`;
                    console.log('sssss');
                    window.location.href = '11422rn.html';
                }
            });
    });
});