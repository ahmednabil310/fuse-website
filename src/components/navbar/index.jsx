import React, { useState, useRef } from 'react'
import { withRouter } from 'react-router'
import classNames from 'classnames'
import useOutsideClick from '@/hooks/useOutsideClick.jsx'
import fuseLogo from '@/assets/images/site-logo.svg'
import fuseLogoWhite from '@/assets/images/group_21.svg'
import AnimatedNavbar from '@/components/navbar/AnimatedNavbar'
import SelectLanguage from '../shared/select_language'
import MobileMenu from './MobileMenu'

function Header ({ history }) {
  const [isOpen, setMenuOpen] = useState(false)
  const hamburgerRef = useRef(null)

  const isWhite = !history.location.pathname.includes('about')

  useOutsideClick(hamburgerRef, () => {
    if (isOpen) {
      setMenuOpen(false)
    }
  })

  const homePage = () => history.push('/')
  const ecosystemPage = () => history.push('/ecosystem')
  return (
    <header className='header__wrapper'>
      <div className='header'>
        <div onClick={homePage} className='header__logo'>
          <img alt='logo' src={isWhite ? fuseLogoWhite : fuseLogo} />
        </div>
        <MobileMenu />
        <div
          className={classNames(
            'header__nav grid-x align-middle align-justify',
            { header__nav__open: isOpen }
          )}
        >
          <div className='header__link__wrapper cell shrink'>
            <AnimatedNavbar duration={300} />
            <div className='nav__item' onClick={ecosystemPage}>
              <a
                rel='noreferrer noopener'
                className={classNames('text', { 'text--white': isWhite })}
                target='_blank'
              >
                Ecosystem
              </a>
            </div>
          </div>
          <div className='grid-x align-middle  cell shrink'>
            <SelectLanguage />
          </div>
        </div>
      </div>
    </header>
  )
}

export default withRouter(Header)
