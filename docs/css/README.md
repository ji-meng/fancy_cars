# Styling (CSS)

## Table of Contents

- [Next Generation CSS](#next-generation-css)
- [styled-components](#styled-components)

## Next Generation CSS

This project uses [`styled-components`](https://github.com/styled-components/styled-components) :nail_care:
for styling react components. `styled-components` allows you to write actual CSS inside your JavaScript,
enabling you to use the [full power of CSS](https://github.com/styled-components/styled-components/blob/master/docs/css-we-support.md) :muscle:
without mapping between styles and components.
Watch this video for a comparison and to see how it enforces best practices!

[![Styled-components: Enforcing best practices](http://img.youtube.com/vi/jaqDA7Btm3c/0.jpg)](https://youtu.be/jaqDA7Btm3c)

To supplement `styled-components`, this project also uses
[`sanitize.css`](https://github.com/jonathantneal/sanitize.css)
to make browsers render all elements more consistently and in line with modern standards,
it's a modern alternative to CSS resets. More info available on the [`sanitize.css` page](sanitize.md).

## styled-components

Below creates two styled react components (`<Title>`, `<Wrapper>`) and renders them
as children of the `<Header>` component:

```jsx
import React from 'react';
import styled from 'styled-components';

// Create a <Title> react component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a <Wrapper> react component that renders a <section> with
// some padding and a papayawhip background
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

// Use them like any other React component – except they're styled!
class Button extends React.Component {
  render() {
    return (
      <Wrapper>
        <Title>Hello {this.props.name}, this is your first styled component!</Title>
        ...
      </Wrapper>
    );
  }
}

```

*(The CSS rules are automatically vendor prefixed, so you don't have to think about it!)*

> For more information about `styled-components` see https://github.com/styled-components/styled-components

##  Making your development life easier - Handy things
Be sure to be fresh on the styled-components concept. Things like extend, and attrs are some basics you should be aware of
https://www.styled-components.com/docs/basics#extending-styles

## Plugin - PyCharm
The ‘Styled Components’ plugin for PyCharm can be found by going to:
 Preferences -> Plugins and searching for styled components. 
If you can’t see it, make sure you are running the latest version of pycharm

- Vscode: there is also vscode-styled-components extension in vscode.
