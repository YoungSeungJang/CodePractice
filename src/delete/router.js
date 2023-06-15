import { useState } from 'react';

const createRouter = () => {
	const [state, setState] = useState();
	const routes = [];

	const router = {
		addRoute(fragment, component) {
			routes.push({ fragment, component });
		},
		start() {
			const checkRoutes = () => {
				const currentRoute = routes.find(
					route => route.fragment === window.location.hash,
				);
				currentRoute.component;
			};

			window.addEventListener('hashchange', checkRoutes);
			checkRoutes();
		},
	};
	return router;
};

export default createRouter;
