import { useEffect, useState } from 'react';

const MyPage = () => {
	const [content, setContent] = useState('');

	useEffect(() => {
		const saveContent = localStorage.getItem('content');
		if (saveContent) {
			setContent(saveContent);
		}

		const goBack = e => {
			e.preventDefault();
			e.returnValue = '';

			localStorage.setItem('content', content);
		};

		window.addEventListener('beforeunload', goBack);
		return () => {
			window.removeEventListener('beforeunload', goBack);
			localStorage.removeItem('content');
		};
	}, []);

	const handleChangeContent = e => {
		const content = e.target.value;
		setContent(content);
		console.log(content);
	};

	return (
		<>
			<input value={content} onChange={handleChangeContent} />
		</>
	);
};

export default MyPage;
