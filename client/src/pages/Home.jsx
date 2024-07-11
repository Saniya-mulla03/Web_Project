export const Home = () => {

    return (
        <>
            <main>
                <section className="section-hero">
                    <div className="container grid grid-two-cols">
                        <div className="hero-content">
                            <h2>Welcome to Campus Info System</h2>
                            <br/>
                            <p>
                            Stay updated with the latest campus information through our efficient communication platform. Designed to keep students informed and engaged, this system ensures you never miss important updates and events. This platform ensures you are always in the loop, making it easier to manage your academic and extracurricular activities seamlessly. Stay connected, stay informed, and make the most of your campus experience.
                            </p>
                            <div className="btn btn-group">
                                <a href="/contact">
                                    <br/>
                                    <button className="btn">connect now</button>
                                </a>
                            </div>
                        </div>
                        <div className="hero-image">
                            <img src="/images/notify.jpg" alt="image" width="400" height="500"></img>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
