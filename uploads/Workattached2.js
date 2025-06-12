import React, { useState } from "react";

function Workattached() {
  const [isFlipped, setIsFlipped] = useState(false);

  

  const innerStyle = {
    width: "100%",
    height: "100%",
    position: "relative",
    transition: "transform 0.6s",
    transformStyle: "preserve-3d",
    transform: isFlipped ? "rotateY(180deg)" : "none",
    cursor: "pointer",
  };

  const faceStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    backfaceVisibility: "hidden",
    top: 0,
    left: 0,
  };

  const frontStyle = {
    ...faceStyle,
  };

  const backStyle = {
    ...faceStyle,
    transform: "rotateY(180deg)",
    
  };

  const handleMouseEnter = (idx) => {
    if (window.innerWidth > 600) {
       setIsFlipped(f => f.map((v, i) => i === idx ? true : v));
    }
  };
  const handleMouseLeave = (idx) => {
    if (window.innerWidth > 600) {
       setIsFlipped(f => f.map((v, i) => i === idx ? false : v));
    }
  };
  const handleClick = (idx) => {
     setIsFlipped(f => f.map((v, i) => i === idx ? !v : v));
  };

  return (

<div>


  <div>
    
		

  </div>
  <section className="section">
      <div className="w-layout-blockcontainer container w-container">
        <div className="works-square-wrapper">
         <div className="projects-title">
              <div className="no-wrap">
                <h2 className="text-size-small text-weight-regular">Selected projects</h2>
              </div>
              <div className="divider" />
            </div>
            
         
<div className="works-list-wrapper w-dyn-list">
              <div role="list" className="collection-list-works w-dyn-items">
                <div data-w-id="80495093-3823-175b-aa40-d9a53ae32bd9" role="listitem" className="card-rotate-works w-dyn-item">

                  <div href="#" data-w-id="64e1c931-f1a3-7087-e671-8aa1d29ee333" className="works-card-wrapper"
                    key={idx}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
             
                onClick={() => handleClick(idx)}
                tabIndex={0}>
                  

                    <div style={innerStyle}>
                    <div className="works-card is-front" style={frontStyle} >
                      <div className="works-card-image"><img alt="Straps" loading="lazy" src="https://cdn.prod.website-files.com/67f796f12e8500b1f597d79c/67f796f12e8500b1f597d97a_Works%20Image.jpg" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="https://cdn.prod.website-files.com/67f796f12e8500b1f597d79c/67f796f12e8500b1f597d97a_Works%2520Image-p-500.jpg 500w, https://cdn.prod.website-files.com/67f796f12e8500b1f597d79c/67f796f12e8500b1f597d97a_Works%2520Image-p-800.jpg 800w, https://cdn.prod.website-files.com/67f796f12e8500b1f597d79c/67f796f12e8500b1f597d97a_Works%2520Image-p-1080.jpg 1080w, https://cdn.prod.website-files.com/67f796f12e8500b1f597d79c/67f796f12e8500b1f597d97a_Works%2520Image-p-1600.jpg 1600w, https://cdn.prod.website-files.com/67f796f12e8500b1f597d79c/67f796f12e8500b1f597d97a_Works%2520Image-p-2000.jpg 2000w, https://cdn.prod.website-files.com/67f796f12e8500b1f597d79c/67f796f12e8500b1f597d97a_Works%20Image.jpg 2880w" className="image" /></div>
                      <div className="works-card-tittle">
                        <div className="max-width-30ch">
                          <h2 className="text-size-xlarge line-height-140 text-weight-regular">Straps</h2>
                        </div>
                        <div className="opacity-60">
                          <h2 className="text-size-small text-weight-regular">2025</h2>
                        </div>
                      </div><a href="/works/creative-straps" className="button-cards-home mobile w-inline-block" />
                    </div>

                    <div className="works-card-back is-back" style={backStyle}>
                      <div className="works-card-content">
                        <div href="#" className="image-mobile"><img src="https://cdn.prod.website-files.com/67f796f12e8500b1f597d79c/67f796f12e8500b1f597d97a_Works%20Image.jpg" loading="lazy" alt="" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="https://cdn.prod.website-files.com/67f796f12e8500b1f597d79c/67f796f12e8500b1f597d97a_Works%2520Image-p-500.jpg 500w, https://cdn.prod.website-files.com/67f796f12e8500b1f597d79c/67f796f12e8500b1f597d97a_Works%2520Image-p-800.jpg 800w, https://cdn.prod.website-files.com/67f796f12e8500b1f597d79c/67f796f12e8500b1f597d97a_Works%2520Image-p-1080.jpg 1080w, https://cdn.prod.website-files.com/67f796f12e8500b1f597d79c/67f796f12e8500b1f597d97a_Works%2520Image-p-1600.jpg 1600w, https://cdn.prod.website-files.com/67f796f12e8500b1f597d79c/67f796f12e8500b1f597d97a_Works%2520Image-p-2000.jpg 2000w, https://cdn.prod.website-files.com/67f796f12e8500b1f597d79c/67f796f12e8500b1f597d97a_Works%20Image.jpg 2880w" />
                        </div>
                        <div className="works-back-card-content">
                          <div className="opacity-61">
                            <h2 className="text-size-small text-weight-regular">2025</h2>
                          </div>
                          <div className="max-width-22ch">
                            <h2 className="text-size-xxlarge line-height-140 text-weight-regular">Straps
                              combines high-end visuals with exceptional moments</h2>
                          </div>
                          <div className="opacity-70 hide-mobile">
                            <p className="text-size-small line-height-150">Lorem ipsum dolor sit amet,
                              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                              exercitation ullamco laboris nisi ut aliquip ex ea commodo
                              consequat.</p>
                          </div>
                          <div className="opacity-70 mobile">
                            <p className="text-size-small line-height-150">Lorem ipsum dolor sit amet,
                              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                              labore</p>
                          </div>
                        </div>
                        <div href="#" data-w-id="43c6bf5b-aed1-63c3-997f-9963a15468bc" className="button-primary">
                          <div className="button-text-wrapper align-center">
                            <div className="text-size-small text-weight-medium">View project</div>
                          </div>
                          <div className="fill-top" />
                          <div className="fill-bottom" />
                          <div className="fill-left" />
                          <div className="fill-right" />
                          <div className="embed-border w-embed"><svg width={166} height={50} viewBox="0 0 166 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 13V2C1 1.44772 1.44772 1 2 1H13M165 13V2C165 1.44772 164.552 1 164 1H153M1 39V50C1 50.5523 1.44772 51 2 51H13M165 39V50C165 50.5523 164.552 51 164 51H153" stroke="#EFEEEC" strokeLinecap="round" />
                            </svg></div>
                        </div>
                      </div>
                     

                  </div>



                  
                </div>
                </div>
                  {/* //here i can add more projects in future */}

             
             
             
             
             
              </div>




              
              {/* //second project  */}

              
            </div>
            
            </div>





         <a href="/work/work-1" data-w-id="bf4677f2-c516-baba-620c-f27106978f09" className="button-primary w-inline-block">
              <div className="button-text-wrapper align-center">
                <div className="text-size-small text-weight-medium">View all projects</div>
              </div>
              <div className="fill-top" />
              <div className="fill-bottom" />
              <div className="fill-left" />
              <div className="fill-right" />
              
                  <path d="M1 13V2C1 1.44772 1.44772 1 2 1H13M165 13V2C165 1.44772 164.552 1 164 1H153M1 39V50C1 50.5523 1.44772 51 2 51H13M165 39V50C165 50.5523 164.552 51 164 51H153" stroke="#EFEEEC" strokeLinecap="round" />
               
            </a>
        </div>
      </div>
    </section>

</div>

    
  );
}
export default Workattached;
