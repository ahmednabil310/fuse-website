import React, { useRef, useEffect } from 'react'
import lottie from 'lottie-web'
import Header from '@/components/header'
import whiteArrow from '@/assets/images/white_arrow.svg'
import newIcon from '@/assets/images/new_notification.png'
import arrowIcon from '@/assets/images/arrow_new.svg'
import animationData from '@/assets/lottie/home_page/data.json'

const SectionOne = () => {
  const lottieRef = useRef(null)

  useEffect(() => {
    if (lottieRef.current)
      lottie.loadAnimation({
        animationData,
        container: lottieRef.current,
        renderer: 'svg',
        loop: true,
      })
  }, [lottieRef])
  return (
    <section className="section-A">
      <Header />
      <div className='section-A__overlay'>
        <div className='section-A__wrapper medium-12 small-24'>
          <div class='section-A__news'>
            <img alt="new_notification" src={newIcon} />
            <a rel="noreferrer noopener" class='link'
              href='https://medium.com/fusenet/fuse-public-release-on-mesa-decentralised-exchange-ce75c4534a60' target="_blank">
              Fuse Liquidity Release on Mesa
              Thursday, October 22nd
              </a>
            <span class="arrow"><img alt="arrow" src={arrowIcon} /></span>
          </div>
          <div className='section-A__main'>
            <h1 className='main_title'>
             社区经济的兴盛
            </h1>
            <p className='section-A__text'>
              允许公司和社区实现安全无摩擦轻松的手机支付方式
            </p>
            <div className="grid-x buttons">
              <a rel="noopener noreferrer" href='https://studio.fuse.io' target="_blank" role="button" className='cell medium-10 small-18'>
                <button data-event="Launch an economy"
                  className='section-A__launch__button section-A__launch__button--blue'>
                  <span>Fuse工作室</span>
                  <span className='section-A__arrow'>
                    <img alt='image' src={whiteArrow} />
                  </span>
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className='section-A__image medium-12 small-24'>
          <div id="lottie" ref={lottieRef} />
        </div>
      </div>
    </section>
  )
}

export default SectionOne