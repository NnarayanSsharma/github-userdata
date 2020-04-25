import React, { useState, useEffect } from 'react'

function GetData() {
    // const [datas, setData] = useState([]);
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [followers, setFollowers] = useState('');
    const [following, setFollowing] = useState('');
    const [repos, setRepos] = useState('');
    const [avatar, setAwatar] = useState('');
    const [userInput, setUserInput] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('https://api.github.com/users/example')
        .then(res=> res.json())
        .then(data=>setData(data))
    }, [])

    const setData = ({name,login, followers, following, public_repos, avatar_url}) => {
    
        setName(name);
        setUserName(login);
        setFollowers(followers);
        setFollowing(following);
        setRepos(public_repos);
        setAwatar(avatar_url)
    }
    const handleSearch = (e) => {
        // e.preventDefault() 
        setUserInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault() 
        if(userInput != ''){
            fetch(`https://api.github.com/users/${userInput}`)
            .then(res=> res.json())
            .then(data=> {
                if(data.message){
                    setError(!error)
                }else{
                    setError(false)
                    setData(data);
                }
            })
        }

        else{
            alert("Write your user name first")
        }
    }
    return (
        <div>
            <div className="search">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="userInput"
                        placeholder="Write your GitHub user name"
                        value={userInput}
                        onChange={handleSearch} 
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            {error ? <h1> Data Not Found </h1>
            :(   
            <div className="card">
                <img src={avatar} />
                <div className="data">
                    <p><span>Name: </span>{name? name : "XYZ"}</p>
                    <p><span>User Name: </span>{userName==="example"? "XYZ": userName} </p>
                    <hr/>
                    <p>
                        <i class="fas fa-user"></i>
                        <span> {followers} Followers </span>
                    </p>
                    <hr/>
                    <p>
                        <i class="fas fa-user"></i>
                        <span> {repos} Repos </span>
                    </p>
                    <hr/>
                    <p>
                        <i class="fas fa-user"></i>
                        <span> {following} Following </span>
                    </p>
                </div>

            </div>
            )}
        </div>
    )
}

export default GetData
