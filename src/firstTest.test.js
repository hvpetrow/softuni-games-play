import { Home } from "./components/Home/Home";
import ReactDOM from 'react-dom/client';
import { unmountComponentAtNode } from "react-dom";
import {screen,render,waitFor,fireEvent} from 'testing-library/react';

// let container = null;
// example:
// beforeEach(() => {
//     const container = document.createElement('div');
// // document.body.appendChild('container');
// })

// afterEach(() => {
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
// })

// test('Joke Article',async () => {
//     const value = 'Chuck Norris smth';
// const container = document.createElement('div');
// document.body.appendChild('container');
//     act(()=> {
//     root.render(<JokeArticle text={value} />);// 
// or
// render(<JokeArticle text={value} />) // can also render invoke from react library
// })

// const actual = document.querySelector('.joke-text').textContent;
// expect(value).toEqual(actual);
// });

// SEE mORE in testing recipes in React documentation , JEST documentation , react testing library and etc.

test('Should pass always', () => {
    <Home/>
    expect(true).toBe(true);
}); 

// all is imported from @testing-library/react
test('using test library',() => {
    const value = 'Chuck Norris smth';
render(<Home text={value} />)

expect(screen.getByText(value)).toBeInTheDocument();
})