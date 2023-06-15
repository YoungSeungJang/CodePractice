import About from 'About';
import Home from 'Home';
import User from 'User';
import { useEffect, useState } from 'react';

function App() {
	/* 
  생각의 흔적들 ... 
	const customRouter = createRouter();
	customRouter.addRoute('#/', 'HOME');
	customRouter.addRoute('#/ABOUT', 'ABOUT');
	customRouter.addRoute('#/CONTACT', 'CONTACT');
	customRouter.start();
	return (
		<>
			<ul>
				<a href="#/">HOME</a>
				<a href="#/ABOUT">ABOUT</a>
				<a href="#/CONTACT">CONTACT</a>
				<button data></button>
			</ul>
		</>
    // const navigateTo = page => {
      // 	setCurrentPage(page);
      // };
      );
      
      <button onClick={() => navigateTo('home')}>HOME</button>
      <button onClick={() => navigateTo('about')}>ABOUT</button>
  */
	const [currentPage, setCurrentPage] = useState(window.location.hash.slice(1));
	const [params, setParams] = useState({});

	useEffect(() => {
		const handleHashChange = () => {
			const hash = window.location.hash.slice(1);
			setCurrentPage(hash);
			setParams(parseHashParams(hash));
		};
		window.addEventListener('hashchange', handleHashChange);

		return () => {
			window.removeEventListener('hashchange', handleHashChange);
		};
	}, []);

	const parseHashParams = hash => {
		const params = {};
		const paramStrings = hash.split('/');

		const key = 'keyName';
		const value = paramStrings[1];
		params[key] = value;

		console.log(params);
		return params;
	};

	return (
		<div>
			<button onClick={() => (window.location.hash = 'home')}>HOME</button>
			<button onClick={() => (window.location.hash = 'about')}>ABOUT</button>
			<button onClick={() => (window.location.hash = 'detail/me')}>
				It's ME
			</button>
			<button onClick={() => (window.location.hash = 'detail/you')}>
				It's YOU
			</button>
			<button onClick={() => (window.location.hash = 'myPage')}>myPage</button>

			{currentPage === 'home' && <Home />}
			{currentPage === 'about' && <About />}
			{currentPage.startsWith('detail/') && <User user={params.keyName} />}
		</div>
	);
}

export default App;
