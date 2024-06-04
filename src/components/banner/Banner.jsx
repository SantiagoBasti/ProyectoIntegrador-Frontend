import "./banner.css";

export default function BannerPrincipal(){
    return(
        <>
        <div id="mainBanner" className="carousel slide main-carousel" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#mainBanner" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#mainBanner" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#mainBanner" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner active">
                <div className="carousel-item active">
                <img src="https://www.incolmotos-yamaha.com.co/wp-content/uploads/2018/03/MT10_banner_interna.jpg" className="d-block w-100" alt="MT10" />
                    <div className="carousel-caption d-none d-md-block banner-info">
                        <h5>Yamaha MT10</h5>
                        <p>Explora el mundo con claridad y precisión, captura cada momento con perfección</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="https://images.squarespace-cdn.com/content/v1/5909c09037c581454e2f9775/1599461218852-V5IHTYXWW0DQXRWMX6Q2/motorcyle_rider_portrait_photographer_melbourne-4.jpg" className="d-block w-100" alt="Yamaha R1" />
                    <div className="carousel-caption d-none d-md-block banner-info">
                        <h5>Yamaha R1</h5>
                        <p>Potencia sin limites y creatividad sin fronteras, la nueva era de la productividad</p>
                    </div>
                </div>
                <div className="carousel-item">
                <img src="https://www.moto7.net/imgs/231123-2024mt10-30.jpg" className="d-block w-100" alt="MT09" />
                    <div className="carousel-caption d-none d-md-block banner-info">
                        <h5>Yamaha MT09</h5>
                        <p>Sumérgete en un mundo de sonido inmersivo y cancelación de ruido</p>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#mainBanner" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#mainBanner" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        </>
    )
}