// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from 'https://dev.jspm.io/react/index.js';
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from 'https://dev.jspm.io/react-dom/server.js';
import { createApp } from 'https://deno.land/x/servest@v1.3.1/mod.ts';

const app = createApp();

const colors: string[] = [];

app.handle('/', async (req) => {
	const response = (
		<html>
			<head>
				<meta charSet='utf-8' />
				<title>Color list</title>
			</head>
			<body
				style={{
					backgroundColor: 'black',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				<div>
					<h1 style={{ color: 'white' }}>Write a color</h1>
					<form action='POST'>
						<input type='text' name='color' />
						<button type='submit'>Send</button>
					</form>
				</div>
				<div>
					<ul>
						{colors.map((color) => (
							<li key={color} style={{ color: color }}>
								{color}
							</li>
						))}
					</ul>
				</div>
			</body>
		</html>
	);

	await req.respond({
		status: 200,
		headers: new Headers({
			'content-type': 'text/html; charset=UTF-8',
		}),
		body: ReactDOMServer.renderToString(response),
	});
});

app.handle('/POST', async (req) => {
	let query = req.url.replace(/\/POST/g, '');
	const params = new URLSearchParams(query);
	let color = params.get('color');

	if (color) {
		colors.push(color.toLowerCase());
	}

	const response = (
		<html>
			<head>
				<meta charSet='utf-8' />
				<title>Color list</title>
			</head>
			<body
				style={{
					backgroundColor: 'black',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				<div>
					<h1 style={{ color: 'white' }}>Write a color</h1>
					<form action='POST'>
						<input type='text' name='color' />
						<button type='submit'>Send</button>
					</form>
				</div>
				<div>
					<ul>
						{colors.map((color) => (
							<li key={color} style={{ color: color }}>
								{color}
							</li>
						))}
					</ul>
				</div>
			</body>
		</html>
	);

	await req.respond({
		status: 200,
		headers: new Headers({
			'content-type': 'text/html; charset=UTF-8',
		}),
		body: ReactDOMServer.renderToString(response),
	});
});

app.listen({ port: 8080 });
