import { fireEvent, render, screen } from '@testing-library/react';
import App, { replaceCameWithSpaces } from './App';

test('button has correct initial color', () => {
  render(<App />);
  //find an element with a role of button and text of 'Change'
  const buttonStyle = screen.getByRole('button', {name: 'Change to blue'});
  //expect the background color to be red
  expect(buttonStyle).toHaveStyle({backgroundColor: 'red'});

});

test('button turns blue when clicked', () => {
  render(<App />);
  const buttonStyle = screen.getByRole('button', {name: 'Change to blue'});
  //click button
  fireEvent.click(buttonStyle);
  //expect the background color to be bliue
  expect(buttonStyle).toHaveStyle({backgroundColor: 'blue'});
  //expect the button text to be ' Change to red'
  expect(buttonStyle.textContent).toBe('Change to red');  
});

test('initial conditions', () => {
  render(<App />);
  //check that the button start out enable
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  expect(colorButton).toBeEnabled();

  //check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();

});


test('Checkbox disables button on firt click and enable on second click', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', {name: 'Disabled button'});
  // const inputCheck = screen.getByTestId('disabled-button-checkbox');
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  const button = screen.getByRole('button');

  
  // expect(inputCheck).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test('Disabled button has gray background and reverts to red', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', {name: 'Disabled button'});
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  //disabled button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: gray');

  //re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: red');

});
test('Clicked disabled button has gray background and reverts to blue', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', {name: 'Disabled button'});
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});

  //change button to blue
  fireEvent.click(colorButton);

  //disabled button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: gray');

  //re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: blue');
});

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCameWithSpaces('Red')).toBe('Red'); 

  });
  test('Works for one  inner capital letter', () => {
    expect(replaceCameWithSpaces('MidnightBlue')).toBe('Midnight Blue'); 

  });
  test('Works for multiple inner capital letters', () => {
    expect(replaceCameWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');

  });


})











  


