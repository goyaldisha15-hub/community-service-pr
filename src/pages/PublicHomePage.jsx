import { Link } from 'react-router-dom'
import './PublicHomePage.css'

const programs = [
  { title: 'Learning & opportunity', copy: 'Helping people build skills, confidence, and a brighter path forward.' },
  { title: 'Health & wellbeing', copy: 'Bringing care, awareness, and practical support closer to the community.' },
  { title: 'Stronger communities', copy: 'Supporting local people as they create lasting change where they live.' },
]

export default function PublicHomePage() {
  return <main className="ngo-home" id="top">
    <section className="ngo-hero">
      <div className="ngo-hero-copy">
        <span className="ngo-eyebrow">PEOPLE FIRST. COMMUNITY ALWAYS.</span>
        <h1>Small acts.<br /><em>Lasting change.</em></h1>
        <p>We work alongside communities to make everyday life a little brighter, fairer, and full of possibility.</p>
        <div className="ngo-hero-actions"><a className="ngo-button ngo-button-dark" href="#our-work">Explore our work</a><Link className="ngo-text-link" to="/signup">Join our community</Link></div>
        <div className="ngo-hero-caption"><span className="caption-line" />Real people. Shared effort. A better tomorrow.</div>
      </div>
      <div className="ngo-hero-photo-wrap">
        <div className="ngo-photo-frame"><img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=85" alt="Children learning together in a classroom" /><div className="photo-wash" /></div>
        <div className="photo-caption">Working hand in hand with local communities</div>
      </div>
    </section>

    <div className="ngo-ribbon" aria-label="Our values"><span>CARE</span><span>DIGNITY</span><span>OPPORTUNITY</span><span>TOGETHER</span></div>

    <section className="ngo-about" id="about-us">
      <div className="ngo-section-label"><span>01</span> A LITTLE ABOUT US</div>
      <div className="ngo-about-content"><h2>We believe a caring community can change <em>everything.</em></h2><div><p>Lasting change begins when people come together. We listen, learn, and work with local communities to support the things that help people thrive.</p><a href="#our-work" className="ngo-under-link">Get to know our work</a></div></div>
      <div className="ngo-values-grid"><div><span className="value-mark" /><h3>Lead with care</h3><p>Every person deserves to be met with kindness and respect.</p></div><div><span className="value-mark" /><h3>Listen first</h3><p>We believe good work starts with the voices of the community.</p></div><div><span className="value-mark" /><h3>Grow together</h3><p>Progress lasts when people have a part in shaping it.</p></div></div>
    </section>

    <section className="ngo-work" id="our-work">
      <div className="ngo-work-heading"><div><div className="ngo-section-label"><span>02</span> WHAT WE CARE ABOUT</div><h2>Good things grow<br />from <em>good care.</em></h2></div><p>We support the everyday foundations that help individuals and communities move forward.</p></div>
      <div className="ngo-program-grid">{programs.map((program, index) => <article className="ngo-program-card" key={program.title}><span className="program-number">0{index + 1} / OUR FOCUS</span><h3>{program.title}</h3><p>{program.copy}</p><a href="#get-involved">Learn more</a></article>)}</div>
    </section>

    <section className="ngo-quote" id="stories"><p className="ngo-quote-label">A THOUGHT THAT GUIDES US</p><blockquote>When we show up for one another, hope becomes something we can build.</blockquote><p className="ngo-quote-caption">A belief we bring to every community</p></section>

    <section className="ngo-join" id="get-involved"><div><div className="ngo-section-label"><span>03</span> THERE'S A PLACE FOR YOU HERE</div><h2>Be part of something <em>good.</em></h2><p>Bring your time, your care, and your ideas. Together, we can make a difference that reaches further.</p></div><Link className="ngo-button ngo-button-light" to="/signup">Become a volunteer</Link></section>

    <footer className="ngo-footer"><Link className="ngo-wordmark" to="#top"><span className="wordmark-icon">T</span><span>Together<br /><small>community foundation</small></span></Link><p>For people. With people. Always.</p><div><a href="#about-us">About</a><a href="#our-work">Our work</a><a href="#get-involved">Get involved</a><Link to="/login">Team login</Link></div><small className="ngo-copyright">© {new Date().getFullYear()} Together Foundation</small></footer>
  </main>
}
