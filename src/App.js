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
	//  현재주소를 저장할 state
	const [currentPage, setCurrentPage] = useState(window.location.hash.slice(1));
	// query param을 받기위한 state
	const [params, setParams] = useState({});

	useEffect(() => {
		// 현재주소값과 param을 각 currentPage와 param에 set해주는 역할
		const handleHashChange = () => {
			const hash = window.location.hash.slice(1);
			setCurrentPage(hash);
			setParams(parseHashParams(hash));
		};
		// 해쉬값이 바뀔때마다 감지하는 이벤트를 등록
		window.addEventListener('hashchange', handleHashChange);

		// 언마운트시 이벤트삭제
		return () => {
			window.removeEventListener('hashchange', handleHashChange);
		};
	}, []);

	// 해쉬를 제외한 param을 구현할때 param값을 추출하기위한 함수
	const parseHashParams = hash => {
		const params = {};
		const paramStrings = hash.split('/');

		const key = 'keyName';
		const value = paramStrings[1];
		params[key] = value;

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
