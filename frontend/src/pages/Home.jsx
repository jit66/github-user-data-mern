import React from 'react'
import Search from '../components/Search';
import SortRepos from '../components/SortRepos';
import Profile from '../components/Profile';
import Repos from '../components/Repos';

const Home = () => {
	return (
		<div className='m-4'>
			<Search />
			 <SortRepos />
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
             <Profile />
				
				<Repos />
				{/* <Spinner /> */}
			</div>
		</div>
	);
};

export default Home