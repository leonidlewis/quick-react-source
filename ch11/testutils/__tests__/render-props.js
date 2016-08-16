jest.dontMock('react')
jest.dontMock('react-addons-test-utils')

describe('HelloWorld', ()=>{
  const TestUtils = require('react-addons-test-utils')
  const React = require('react')

  it('has props', (done)=>{

    const HelloWorld = React.createClass({
      render() {
        return <div>{this.props.children}</div>
      }
    })
    let hello = TestUtils.renderIntoDocument(<HelloWorld>Hello Node!</HelloWorld>)
    expect(hello.props).toBeDefined()
    console.log('my hello props:', hello.props) // my div: Hello Node!

    done()
  })
})