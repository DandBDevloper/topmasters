import Image from "next/image";

const Explore = () => {
  // Array of iconbox data
  const iconboxData = [
    {
      icon: "/images/icon/agent.svg",
      title: "Personalized Consultation",
      text: "Begin with a personalized, one-on-one consultation that precisely identifies your real estate goals and tailors a custom strategy.",
      linkText: "Enquire Now",
    },
    {
      icon: "/images/icon/agent.svg",
      title: "Market Insights",
      text: "Leverage comprehensive market insights through detailed data analysis to form a custom property approach and smart investment plan.",
      linkText: "Enquire Now",
    },
    {
      icon: "/images/icon/dubai.svg",
      title: "Seamless Transaction Support",
      text: "Experience expert, step-by-step support from property viewing and negotiation to closing procedures, ensuring a consistently smooth, stress-free transaction.",
      linkText: "Find a Home",
    },
  ];

  return (
    <>
      {iconboxData.map((item, index) => (
        <div
          className="col-sm-6 col-lg-4"
          key={index}
          data-aos="fade-up"
          data-aos-delay={(index + 1) * 100} // Increase delay for each item
        >
          <div className="iconbox-style3 text-center">
            <div className="icon">
              <Image width={150} height={75} src={item.icon} alt="icon" />
            </div>
            <div className="iconbox-content">
              <h4 className="title">{item.title}</h4>
              <p className="text">{item.text}</p>
              {/* <a href="#" className="ud-btn btn-thm3">
                {item.linkText}
                <i className="fal fa-arrow-right-long" />
              </a> */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Explore;
