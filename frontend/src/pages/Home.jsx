import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Search from '../components/Search';
import SortRepos from '../components/SortRepos';
import Profile from '../components/Profile';
import Repos from '../components/Repos';
import Spinner from '../components/Spinner';

const Home = () => {
	const [userProfile,setUserProfile] = useState(null)
	const [repos, setRepos] = useState([])
	const [loading , setLoading] = useState(false)

	const [sortType , setSortType] = useState("recent")

const getUserProfileAndRepos = useCallback(
	async(username="jit66") => {
		setLoading(true);
		try {
		  
		const res = await fetch(`http://localhost:5001/api/users/profile/${username}`)

		const {repos ,userProfile} = await res.json()
			console.log(userProfile ,"user profile")

		  repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

		  setRepos(repos);
		  setUserProfile(userProfile)
		  console.log("userProfile",userProfile)
		  console.log("repos",repos)

		  return {userProfile,repos}
		} catch (error) {
		  toast.error(error.message);
		}
			finally {
			  setLoading(false)
		  }
	  },[]);

	useEffect(()=>{
		getUserProfileAndRepos()
	},[getUserProfileAndRepos])

	const onSearch = async(e,username) => {
		e.preventDefault();
		setLoading(true)
		setRepos([])
		setUserProfile(null)

		const {userProfile ,repos} = await getUserProfileAndRepos(username)
		setUserProfile(userProfile)
		setRepos(repos)
		setLoading(false)
		setSortType("recent");
	}

	const onSort =(sortType)=> {
		if (sortType === "recent") {
			repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
		} else if (sortType === "stars") {
			repos.sort((a, b) => b.stargazers_count - a.stargazers_count); 
		} else if (sortType === "forks") {
			repos.sort((a, b) => b.forks_count - a.forks_count); 
		}
		setSortType(sortType);
		setRepos([...repos]);
	}

	return (
    <div className="m-4">
      <Search onSearch={onSearch} />
	  {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType}/>}
      {/* <SortRepos /> */}
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
		{userProfile && !loading && <Profile userProfile={userProfile} />}

		{!loading && <Repos repos={repos}/>}

        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default Home