

document.addEventListener('DOMContentLoaded', () => {
const userListContainer = document.querySelector('#user-list')
const repoListContainer = document.querySelector('#repos-list')
const form = document.querySelector('#github-form');

form.addEventListener('submit', function(e) {
    e.preventDefault()
    let textField = e.target.elements.search.value

    fetch (`https://api.github.com/search/users?q=${textField}`)
    .then(res => res.json())
    .then(gitData => {
        //console.log(gitData)
    let items = gitData.items //try using gitData.forEach(gitObj => renderContent(gitObj))
    for (item of items) {
        let userLogin = item.login
        let userUrl = item.html_url
        let userAvatar = item.avatar_url
    if (textField === userLogin || userLogin.includes(textField)) { //I WANT THIS TO SEARCH AND PRINT OUT ANY USERS THAT MIGHT MATCH!!
        //console.log('this is working')
        userListContainer.innerHTML += `
        <h2 class="user-login">${userLogin}</h2>
        <a href="${userUrl}">Website</a>
        <img src="${userAvatar}" />
        `
    //Make the userLogin a click event to a fetch request for repo

    let userLoginElements = document.querySelectorAll('.user-login') //this is only making the first h2 a click event
    userLoginElements.forEach((element) =>{
    element.addEventListener('click', (e) => {
        let userId = e.target.textContent
        //debugger
       //fetch request
    fetch(`https://api.github.com/users/${userId}/repos`)
    .then(res => res.json())
    .then(repoData => {
        repoData.forEach(repoObj => {
            console.log(repoObj)
            let repoDiv = document.createElement('div')
            repoDiv.innerText = repoObj.name
            repoListContainer.append(repoDiv)

        })
       
    })
    })
    })
    }
}
})
})
})

//eventually use:

//repoListContainer.appendChild()





// for (item of items) {
//     // Code for previous logic...

//     let userLoginElement = document.createElement('h2');
//     userLoginElement.textContent = userLogin;

//     userLoginElement.addEventListener('click', () => {
//         // Code to send a request to the User Repos Endpoint...
//     });

//     userListContainer.appendChild(userLoginElement)