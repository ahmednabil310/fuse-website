import React, { Component } from 'react'
import Navbar from './Navbar'
import NavbarItem from './Navbar/NavbarItem'
import { Flipper } from 'react-flip-toolkit'
import DropdownContainer from './DropdownContainer'
import CommunityDropdown from './DropdownContents/CommunityDropdown'
import ResourcesDropdown from './DropdownContents/ResourcesDropdown'
import ProductsDropdown from './DropdownContents/ProductsDropdown'

const navbarConfig = [
  { title: 'Products', dropdown: ProductsDropdown },
  { title: 'Community', dropdown: CommunityDropdown },
  { title: 'Resources', dropdown: ResourcesDropdown }
]

class AnimatedNavbar extends Component {
  state = {
    activeIndices: []
  }

  resetDropdownState = i => {
    this.setState({
      activeIndices: typeof i === 'number' ? [i] : [],
      animatingOut: false
    })
    delete this.animatingOutTimeout
  }

  handleMouseEnter = i => {
    if (this.animatingOutTimeout) {
      clearTimeout(this.animatingOutTimeout)
      this.resetDropdownState(i)
      return
    }

    if (this.state.activeIndices[this.state.activeIndices.length - 1] === i) {
      return
    }

    this.setState(prevState => ({
      activeIndices: prevState.activeIndices.concat(i),
      animatingOut: false
    }))
  }

  handleMouseLeave = () => {
    this.setState({
      animatingOut: true
    })
    this.animatingOutTimeout = setTimeout(
      this.resetDropdownState,
      this.props.duration
    )
  }

  render() {
    const { duration, isAboutHeader, isNetworkHeader } = this.props
    let CurrentDropdown
    let PrevDropdown
    let direction

    const currentIndex = this.state.activeIndices[
      this.state.activeIndices.length - 1
    ]
    const prevIndex =
      this.state.activeIndices.length > 1 &&
      this.state.activeIndices[this.state.activeIndices.length - 2]

    if (typeof currentIndex === 'number') {
      CurrentDropdown = navbarConfig[currentIndex].dropdown
    }
    if (typeof prevIndex === 'number') {
      PrevDropdown = navbarConfig[prevIndex].dropdown
      direction = currentIndex > prevIndex ? 'right' : 'left'
    }

    return (
      <div className='grid-x'>
        <Flipper
          flipKey={currentIndex}
          spring={duration === 300 ? 'noWobble' : { stiffness: 10, damping: 10 }}
        >
          <Navbar onMouseLeave={this.handleMouseLeave}>
            {navbarConfig.map((n, index) => {
              return (
                <NavbarItem
                  isNetworkHeader={isNetworkHeader}
                  isAboutHeader={isAboutHeader}
                  key={n.title}
                  title={n.title}
                  index={index}
                  onMouseEnter={this.handleMouseEnter}
                >
                  {
                    currentIndex === index && (
                      <DropdownContainer
                        direction={direction}
                        animatingOut={this.state.animatingOut}
                        duration={duration}
                      >
                        <CurrentDropdown />
                        {PrevDropdown && <PrevDropdown />}
                      </DropdownContainer>
                    )
                  }
                </NavbarItem>
              )
            })}
          </Navbar>
        </Flipper>
      </div>
    )
  }
}

export default AnimatedNavbar
