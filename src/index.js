// import { css } from 'glamor'
// import { Stylesheet } from 'glamor/lib/sheet'
// let styleSheet = new Stylesheet()
// styleSheet.inject()
import React from 'react'
import stylis from 'stylis'
import { render } from 'react-dom'
import hashString from './hash'


function css(styles) {
	const hash = hashString(styles.join())
	const string = stylis(`.css-${hash}`, styles[0])
	const tag = document.createElement('style')
	tag.appendChild(document.createTextNode(string))
	document.head.appendChild(tag)
	return `css-${hash}`
}

function objectCss(styles) {
	const stylesAsString = convertObjectToString(styles)
	const hash = hashString(stylesAsString)
	const string = stylis(`.css-${hash}`, stylesAsString)
	const tag = document.createElement('style')
	tag.appendChild(document.createTextNode(string))
	document.head.appendChild(tag)
	return `css-${hash}`
}

function convertObjectToString(object) {
	let string = ''
	for (let key in object) {
		if (typeof object[key] === 'object') {
			string += `${key} { ${convertObjectToString(object[key])} }`
		} else {
			string += `${key}: ${object[key]};`
		}
	}
	return string
}

let rule = css`
	color: red;
	&:hover {
		color: blue;
	}
`

let objectRule = objectCss({
	color: 'red',
	':hover': { color: 'blue' }
})


const styled = {
	div: (styles) => {
		const className = css(styles)
		return class Div extends React.Component {
			render() {
				return (
					<div className={className} {...this.props}>
						{this.props.children}
					</div>
				)
			}
		}
	}
}

const FancyDiv = styled.div`
	color: red;
	&:hover {
		color: blue;
	}
`

render(
	<div>
		<div className={rule}>
			CSS as template string!
		</div>
		<div className={objectRule}>
			CSS as object!
		</div>
		<FancyDiv onClick={(e) => { console.log('hey') }}>
		  styled-components!
		</FancyDiv>
	</div>, 
window.app)